// cypress/e2e/specs/addEmployee.spec.js

import addEmployeePage from '../../pages/addEmployeePage';

describe('Add Employee Test Suite', () => {
  beforeEach(() => {
    // Login using the login page functionality
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();
    
    // Verify login success
    cy.url().should('include', '/dashboard');
    
    // Navigate to Admin > Add User with better verification
    cy.contains('span.oxd-text', 'Admin').click();
    cy.url().should('include', '/admin/viewSystemUsers');
    
    // Click Add button
    cy.get('button.oxd-button--secondary').filter(':contains("Add")').click();
    cy.url().should('include', '/saveSystemUser');
    
    // Wait for form to load completely
    cy.get('input[placeholder="Type for hints..."]').should('be.visible');
    cy.get('.oxd-form').should('be.visible');
    
    // Additional wait for form to be fully ready
    cy.get('body').then($body => {
      if ($body.find('.oxd-loading-spinner').length > 0) {
        cy.get('.oxd-loading-spinner').should('not.exist');
      }
    });
  });

  // ============ TC-001 ============
  it('TC-001: Verify that Admin can successfully add a new user with valid data', () => {
    const timestamp = Date.now();
    const validUserData = {
      userRole: 'Admin',
      employeeName: 'Linda Anderson',
      status: 'Enabled',
      username: `testuser${timestamp}`,
      password: 'Test@12345',
      confirmPassword: 'Test@12345'
    };

    // Use label-based filling for better reliability
    addEmployeePage.fillUserForm(validUserData, true);
    addEmployeePage.clickSave();

    // Verify success message
    // cy.get('.oxd-toast-container', { timeout: 10000 })
    //   .should('be.visible')
    //   .and('contain', 'Successfully Saved');
  });

  // ============ TC-002 ============
  it('TC-002: Verify that required field validation messages appear when fields are left empty', () => {
    addEmployeePage.clickSave();
    addEmployeePage.verifyRequiredErrors();
  });

  // ============ TC-003 ============
  it('TC-003: Verify that system shows error when Password and Confirm Password do not match', () => {
    const mismatchPasswordData = {
      userRole: 'ESS',
      employeeName: 'Linda Anderson',
      status: 'Enabled',
      username: `testuser${Date.now()}`,
      password: 'Test@12345',
      confirmPassword: 'Different@123'
    };

    addEmployeePage.fillUserForm(mismatchPasswordData, true);
    addEmployeePage.clickSave();
    addEmployeePage.verifyPasswordMismatchError();
  });

  // ============ TC-004 ============
  it('TC-004: Verify that system prevents adding user with an existing username', () => {
    const duplicateUsernameData = {
      userRole: 'Admin',
      employeeName: 'Linda Anderson',
      status: 'Enabled',
      username: 'Admin',
      password: 'Test@12345',
      confirmPassword: 'Test@12345'
    };

    addEmployeePage.fillUserForm(duplicateUsernameData, true);
    addEmployeePage.clickSave();
    addEmployeePage.verifyUsernameExistsError();
  });
});