import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    specPattern: "cypress/e2e/**/*.spec.ts",
    supportFile: "cypress/support/e2e.ts",
    fixturesFolder: "cypress/fixtures",
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: false,
    screenshotOnRunFailure: true,
    
    setupNodeEvents(on, config) {
      return config;
    }
  }
});