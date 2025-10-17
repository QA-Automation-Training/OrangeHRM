class LoginPage {
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('button.orangehrm-login-button'),
    loginTitle: () => cy.get('.orangehrm-login-title'),
    errorMessage: () => cy.get('.oxd-alert-content.oxd-alert-content--error'),
    dashboardHeader: () => cy.get('.oxd-topbar-header-breadcrumb'),
    loadingSpinner: () => cy.get('.oxd-loading-spinner', { timeout: 10000 }),
    body: () => cy.get('body')
  };

  visit(): this {
    cy.visit('/web/index.php/auth/login', {
      timeout: 60000,
      onBeforeLoad: (win) => {
        // Bypass any initial loading issues
        win.addEventListener('beforeunload', () => {});
      }
    });
    
    cy.window().should('have.property', 'appGlobal');
    this.waitForPageToLoad();
    return this;
  }

  waitForPageToLoad(): this {
    // Wait for critical elements to be visible
    cy.get('input[name="username"]', { timeout: 30000 }).should('be.visible');
    cy.get('input[name="password"]', { timeout: 30000 }).should('be.visible');
    cy.get('button.orangehrm-login-button', { timeout: 30000 }).should('be.visible');
    
    // Wait for any loading to complete
    this.elements.loadingSpinner().should('not.exist');
    
    return this;
  }

  typeUsername(username: string): this {
    this.elements.usernameInput()
      .should('be.visible')
      .clear({ force: true })
      .type(username, { force: true });
    return this;
  }

  typePassword(password: string): this {
    this.elements.passwordInput()
      .should('be.visible')
      .clear({ force: true })
      .type(password, { force: true });
    return this;
  }

  clickLogin(): this {
    this.elements.loginButton()
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true });
    
    // Wait for navigation or error
    cy.wait(2000);
    return this;
  }

  login(username: string, password: string): this {
    this.typeUsername(username);
    this.typePassword(password);
    this.clickLogin();
    return this;
  }

  getErrorMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.elements.errorMessage();
  }

  getDashboardHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return this.elements.dashboardHeader();
  }

  verifyPageLoaded(): this {
    this.elements.body().should('be.visible');
    this.waitForPageToLoad();
    return this;
  }
}

export default LoginPage;