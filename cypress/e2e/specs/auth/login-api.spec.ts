// cypress/e2e/specs/auth/simple-login-api.spec.ts
describe('Simple Admin API Login Tests - No Custom Commands', () => {
  
  it('Test API login with direct request', () => {
    cy.request({
      method: 'POST',
      url: '/web/index.php/api/v2/auth/login',
      body: {
        username: 'Admin',
        password: 'admin123'
      },
      failOnStatusCode: false // Don't fail on error status codes
    }).then((response) => {
      // Log everything for debugging
      cy.log(` FULL RESPONSE ANALYSIS:`);
      cy.log(` Status: ${response.status}`);
      cy.log(` Status Text: ${response.statusText}`);
      cy.log(`Duration: ${response.duration}ms`);
      
      if (response.headers) {
        cy.log(` Content-Type: ${response.headers['content-type']}`);
      }
      
      if (response.body) {
        cy.log(` Response Body: ${JSON.stringify(response.body)}`);
      }
      
      // Analysis
      if (response.status === 200) {
        cy.log(' SUCCESS: API Login Working!');
        if (response.body.data && response.body.data.token) {
          cy.log(` Token Received: ${response.body.data.token.substring(0, 30)}...`);
        }
      } else if (response.status === 404) {
        cy.log('ENDPOINT NOT FOUND');
        cy.log(' The API endpoint might be disabled in this demo');
      } else if (response.status === 401) {
        cy.log(' UNAUTHORIZED - Check credentials');
      } else if (response.status === 405) {
        cy.log(' METHOD NOT ALLOWED');
      } else {
        cy.log(` UNEXPECTED STATUS: ${response.status}`);
      }
    });
  });

  it('Test multiple potential endpoints', () => {
    const endpoints = [
      '/web/index.php/api/v2/auth/login',
      '/api/v2/auth/login',
      '/auth/api/login',
      '/web/index.php/auth/validate'
    ];

    endpoints.forEach((endpoint, index) => {
      cy.log(`\n Testing endpoint ${index + 1}: ${endpoint}`);
      
      cy.request({
        method: 'POST',
        url: endpoint,
        body: { username: 'Admin', password: 'admin123' },
        failOnStatusCode: false,
        timeout: 10000
      }).then((response) => {
        cy.log(`   Status: ${response.status}`);
        
        if (response.status === 200) {
          cy.log(`    SUCCESS: ${endpoint} WORKS!`);
          if (response.body.data && response.body.data.token) {
            cy.log(`    Token: ${response.body.data.token.substring(0, 20)}...`);
          }
        } else if (response.status === 404) {
          cy.log(`   Not Found`);
        } else {
          cy.log(`    Unexpected: ${response.status}`);
        }
      });

      // Small delay between requests
      if (index < endpoints.length - 1) {
        cy.wait(1000);
      }
    });
  });
});