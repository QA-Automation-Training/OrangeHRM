// cypress/support/commands/auth.api.commands.ts
Cypress.Commands.add('apiLogin', (username: string, password: string) => {
  cy.log(`API Login attempt for user: ${username}`);
  
  return cy.request({
    method: 'POST',
    url: '/web/index.php/api/v2/auth/login',
    body: { 
      username: username, 
      password: password 
    },
    failOnStatusCode: false
  }).then((response) => {
    cy.log(` API Login Response Status: ${response.status}`);
    return cy.wrap(response);
  });
});

Cypress.Commands.add('loginAsAdmin', () => {
  return cy.apiLogin('Admin', 'admin123');
});