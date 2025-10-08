import LoginPage from '../../pages/loginPage'

describe('OrangeHRM Login Tests', () => {
  const loginPage = new LoginPage()

  before(() => {
    // Increase timeout for all tests
    Cypress.config('defaultCommandTimeout', 10000)
    Cypress.config('pageLoadTimeout', 60000)
  })

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    
    cy.visit('/web/index.php/auth/login', {
      timeout: 60000,
      retryOnStatusCodeFailure: true,
      retryOnNetworkFailure: true
    })
    
    // Wait for page to load completely
    cy.get('body').should('be.visible')
    loginPage.waitForPageToLoad()
  })

  it('TC-001: should login successfully with valid credentials', () => {
    loginPage.login('Admin', 'admin123')
    
    // Wait for navigation and verify dashboard
    cy.url({ timeout: 15000 }).should('include', '/dashboard')
    loginPage.getDashboardHeader()
      .should('be.visible')
      .and('contain', 'Dashboard')
  })

  it('TC-002: should display error message with valid username and invalid password', () => {
    loginPage.login('Admin', 'wrongpassword')
    
    // Wait for error message
    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain', 'Invalid credentials')
  })

  // Simple test to verify page loads
  it('should load login page successfully', () => {
    cy.get('input[name="username"]').should('be.visible')
    cy.get('input[name="password"]').should('be.visible')
    cy.contains('Login').should('be.visible')
    cy.contains('Username : Admin').should('be.visible')
  })
})