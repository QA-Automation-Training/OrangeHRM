describe('OrangeHRM Login Test', () => {
  it('Should login successfully', () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[type="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/dashboard')
  })
})