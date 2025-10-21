describe('OrangeHRM API Login', () => {
  it('should log in successfully', () => {
    cy.request({
      method: 'POST',
      url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
      body: {
        username: 'Admin',
        password: 'admin123'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.log('Login successful');
    });
  });
});
