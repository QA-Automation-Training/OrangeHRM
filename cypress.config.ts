import { defineConfig } from "cypress";
import {
  addCucumberPreprocessorPlugin,
} from '@badeball/cypress-cucumber-preprocessor';


export default defineConfig({
  e2e: {
    
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    specPattern: "cypress/e2e/specs/**/*.spec.ts",
    supportFile: "cypress/support/e2e.ts",
    fixturesFolder: "cypress/fixtures",
    viewportWidth: 900,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    responseTimeout: 30000,
    requestTimeout: 5000,
    video: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: 1,
      openMode: 0
    },
    
  }
});