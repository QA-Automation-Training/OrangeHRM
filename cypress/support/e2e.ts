
// cypress/support/e2e.ts
import './commands';

// Global beforeEach hook
beforeEach(function () {
  const testTitle = this.currentTest?.title;
  if (testTitle) {
    cy.log(`Running Test: ${testTitle}`);
  }
});

// Capture screenshots on failure globally
Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const specName = Cypress.spec.name.replace('.spec.ts', '');
    cy.screenshot(`${specName}/${test.title}`, { overwrite: true });
  }
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  console.log('Uncaught exception:', err);
  return false;
});
