// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
// Custom command for quick login
// Custom command for quick login
export { };

declare global {
  namespace Cypress {
    interface Chainable {
      loginToOrangeHRM(username?: string, password?: string): Chainable<void>;
      logout(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('loginToOrangeHRM', (username = "admin", password = "admin123") => {
  cy.visit('/web/index.php/auth/login');
  cy.get('input[name="username"]').type('Admin');
  cy.get('input[name="password"]').type('admin123');
  cy.get('button.orangehrm-login-button').click();
  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add("logout", () => {
  cy.get(`.oxd-userdropdown-name`).click();
  cy.get(`.oxd-dropdown-menu`).contains('Logout').click();
});
// TODO: Add loginToOrangeHRM command
// - Use cy.visit, fill username/password, click login
// - Optionally use cy.session for speed

// TODO: Add generateEmployeeData command
// - Return an object with firstName, lastName, employeeId, username, password
// - Use timestamp or random to avoid duplicates
