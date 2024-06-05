import { createSpinner } from "nanospinner";
import { execSync } from "child_process";
import fs from "fs";
import process from "process";
export const createFile = (fileName, content) => {
  const spinner = createSpinner(`Generating ${fileName}`).start();
  fs.writeFile(fileName, content, (err) => {
    if (err) {
      spinner.error({ text: `Error generating ${fileName} \n` });
      process.exit(1);
    } else {
      spinner.success({ text: `${fileName} created successfully. \n` });
    }
  });
};

export const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: "inherit" });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
};

export const installDependencies = (deps, isDev = true) => {
  const spinner = createSpinner(
    `Currently installing the following dependencies:\n- ${deps.join(
      "\n- ",
    )} \n`,
  ).start();

  const deps_status = runCommand(
    `npm install ${isDev ? "--save-dev" : ""} ${deps.join(" ")}`,
  );

  if (deps_status) {
    spinner.success({ text: "\n Dependencies installed \n" });
  } else {
    spinner.error({ text: "Failed to install dependencies" });
    process.exit(1);
  }
};
