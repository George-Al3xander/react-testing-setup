export const jestConfig = {
  ts: {
    next: `import type { Config } from 'jest'
    import nextJest from 'next/jest.js'
     
    const createJestConfig = nextJest({
      // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
      dir: './',
    })
     
    // Add any custom config to be passed to Jest
    const config: Config = {
      coverageProvider: 'v8',
      testEnvironment: 'jest-environment-jsdom',
      // Add more setup options before each test is run
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      preset: "ts-jest"
    }
     
    // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
    export default createJestConfig(config)`,
    react: `import type { Config } from 'jest'
       
     
    // Add any custom config to be passed to Jest
    const config: Config = {
      coverageProvider: 'v8',
      testEnvironment: 'jest-environment-jsdom',
      // Add more setup options before each test is run
      setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
      preset: "ts-jest"
    }
         
    export default config`,
  },
  noTs: {
    next: `const nextJest = require('next/jest')
 
    /** @type {import('jest').Config} */
    const createJestConfig = nextJest({
      // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
      dir: './',
    })
     
    // Add any custom config to be passed to Jest
    const config = {
        coverageProvider: 'v8',
        testEnvironment: 'jest-environment-jsdom',
        // Add more setup options before each test is run
        setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
        
      }
     
    // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
    module.exports = createJestConfig(config)`,
    react: ` 
    /** @type {import('jest').Config} */
        
    // Add any custom config to be passed to Jest
    const config = {
        coverageProvider: 'v8',
        testEnvironment: 'jest-environment-jsdom',
        // Add more setup options before each test is run
        setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
        
      }
         
    module.exports = config`,
  },
};

export const setup_file_content = `import "@testing-library/jest-dom"`;

export const dependencies_no_ts = [
  "@testing-library/react",
  "@testing-library/jest-dom",
  "@testing-library/user-event",
  "jest",
  "jest-environment-jsdom",
];
export const dependencies_ts = [
  ...dependencies_no_ts,
  ...["ts-jest", "ts-node", "@jest/types"],
];

export const eslint_plugins = [
  "plugin:testing-library/react",
  "plugin:jest-dom/recommended",
];
