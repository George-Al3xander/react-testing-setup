#!/usr/bin/env node

import inquirer from "inquirer";

import fs from "fs";

import {
  jestConfig,
  dependencies_no_ts,
  dependencies_ts,
  setup_file_content,
  eslint_plugins,
} from "./data/data.js";
import { createFile, installDependencies } from "../lib/utils.js";

let framework_choice = "React";
let ts_choice = true;
let eslint_choice = true;

async function init() {
  const actions = [
    askTypescriptUsage,
    askFramework,
    askEslintUsage,
    installReqDependencies,
    createJestFiles,
    handleEslintConfig,
  ];
  for (const action of actions) {
    await action();
  }
}

async function askFramework() {
  const answers = await inquirer.prompt({
    name: "framework_choice",
    type: "list",
    message: "Please select the framework for your testing setup: ",
    choices: ["React", "Next.js"],
  });
  framework_choice = answers.framework_choice;
}

async function askTypescriptUsage() {
  const answers = await inquirer.prompt({
    name: "ts_choice",
    type: "list",
    default: "Yes",
    message: "Do you want to use TypeScript?",
    choices: ["Yes", "No"],
  });
  ts_choice = answers.ts_choice.toLowerCase() == "yes";
}

async function createJestFiles() {
  const fileName = `jest.config.${ts_choice ? "ts" : "js"}`;
  let content = "";
  if (framework_choice.toLowerCase() == "next.js") {
    content = jestConfig[ts_choice ? "ts" : "noTs"].next;
  } else {
    content = jestConfig[ts_choice ? "ts" : "noTs"].react;
  }
  createFile(fileName, content);
  createFile(`jest.setup.${ts_choice ? "ts" : "js"}`, setup_file_content);
}

async function askEslintUsage() {
  const answers = await inquirer.prompt({
    name: "eslint_choice",
    type: "list",
    default: "Yes",
    message:
      "Do you want to set up ESLint with eslint-plugin-jest-dom?(Recommended)",
    choices: ["Yes", "No"],
  });
  eslint_choice = answers.eslint_choice.toLowerCase() == "yes";
}

async function handleEslintConfig() {
  if (eslint_choice) {
    fs.readFile(".eslintrc.json", (err, data) => {
      if (!err && data) {
        const file = JSON.parse(data);
        if ("extends" in file) {
          if (typeof file.extends === "string") {
            file.extends = [file.extends, ...eslint_plugins];
          } else {
            file.extends = [...file.extends, ...eslint_plugins];
          }
        } else {
          file.extends = eslint_plugins;
        }
        createFile(".eslintrc.json", JSON.stringify(file));
      } else {
        createFile(
          ".eslintrc.json",
          JSON.stringify({
            extends: eslint_plugins,
          }),
        );
      }
    });
  }
}

async function installReqDependencies() {
  let deps = ts_choice ? dependencies_ts : dependencies_no_ts;
  if (eslint_choice) {
    deps = [
      ...deps,
      "eslint",
      "eslint-plugin-jest-dom",
      "eslint-plugin-testing-library",
    ];
  }
  installDependencies(deps);
}

await init();
