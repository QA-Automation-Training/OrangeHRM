describe('OrangeHRM API Login', () => {
  it('should log in successfully', () => {
   cy.request({
  method: 'POST',
  url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
  form: true,
  body: { username: 'Admin', password: 'admin123' },
  followRedirect: false
}).then((response) => {
  expect([200, 302]).to.include(response.status);
  cy.log('Login successful, redirect or dashboard loaded');
});

  });
});
