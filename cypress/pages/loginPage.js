class LoginPage {
  elements = {
    usernameInput: () => cy.get('input[name="username"]'),
    passwordInput: () => cy.get('input[name="password"]'),
    loginButton: () => cy.get('button.orangehrm-login-button'),
    loginTitle: () => cy.get('.orangehrm-login-title'),
    errorMessage: () => cy.get('.oxd-alert-content.oxd-alert-content--error'),
    dashboardHeader: () => cy.get('.oxd-topbar-header-breadcrumb'),
    loadingSpinner: () => cy.get('.oxd-loading-spinner', { timeout: 10000 })
  }

  visit() {
    cy.visit('/web/index.php/auth/login', {
      timeout: 60000,
      onBeforeLoad: (win) => {
        // Bypass any initial loading issues
        win.addEventListener('beforeunload', () => {});
      }
    })
    
    // Wait for the page to be fully loaded
    cy.window().should('have.property', 'appGlobal')
    this.waitForPageToLoad()
    return this
  }

  waitForPageToLoad() {
    // Wait for critical elements to be visible
    cy.get('input[name="username"]', { timeout: 30000 }).should('be.visible')
    cy.get('input[name="password"]', { timeout: 30000 }).should('be.visible')
    cy.get('button.orangehrm-login-button', { timeout: 30000 }).should('be.visible')
    
    // Wait for any loading to complete
    this.elements.loadingSpinner().should('not.exist')
    
    return this
  }

  typeUsername(username) {
    this.elements.usernameInput()
      .should('be.visible')
      .clear({ force: true })
      .type(username, { force: true })
    return this
  }

  typePassword(password) {
    this.elements.passwordInput()
      .should('be.visible')
      .clear({ force: true })
      .type(password, { force: true })
    return this
  }

  clickLogin() {
    this.elements.loginButton()
      .should('be.visible')
      .should('not.be.disabled')
      .click({ force: true })
    
    // Wait for navigation or error
    cy.wait(2000)
    return this
  }

  login(username, password) {
    this.typeUsername(username)
    this.typePassword(password)
    this.clickLogin()
    return this
  }

  getErrorMessage() {
    return this.elements.errorMessage({ timeout: 10000 })
  }

  getDashboardHeader() {
    return this.elements.dashboardHeader({ timeout: 15000 })
  }
}

export default LoginPage