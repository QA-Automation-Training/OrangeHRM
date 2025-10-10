// cypress/pages/addEmployeePage.js
class AddEmployeePage {
  elements = {
    // Dropdowns and fields
    userRoleDropdown: () => cy.get('.oxd-select-text').eq(0),
    userRoleOptions: () => cy.get('[role="listbox"]'),
    
    employeeNameInput: () => cy.get('input[placeholder="Type for hints..."]'),
    employeeNameDropdown: () => cy.get('.oxd-autocomplete-dropdown'),
    employeeNameOptions: () => cy.get('.oxd-autocomplete-option'),
    
    statusDropdown: () => cy.get('.oxd-select-text').eq(1),
    statusOptions: () => cy.get('[role="listbox"]'),
    
    // Fixed selectors - using more specific attributes
    usernameInput: () => cy.get('input.oxd-input').eq(2),
    passwordInput: () => cy.get('input[type="password"]').eq(0),
    confirmPasswordInput: () => cy.get('input[type="password"]').eq(1),
    
    saveButton: () => cy.get('button[type="submit"]'),
    
    // Error messages
    requiredErrors: () => cy.get('.oxd-input-field-error-message'),
    fieldErrors: () => cy.get('.oxd-input-group__message'),
    toastMessage: () => cy.get('.oxd-toast-container'),
    
    // Alternative selectors for better reliability
    formInputs: () => cy.get('.oxd-input'),
    passwordFields: () => cy.get('input[type="password"]')
  };

  // ========== Fill form with better error handling ==========
  fillFormWithValidData(data) {
    cy.log('Filling user form with data:', data);

    // Select User Role
    this.elements.userRoleDropdown().click();
    cy.get('[role="option"]').contains(data.userRole).click();

    // Type Employee Name with better dropdown handling
    this.elements.employeeNameInput().clear().type(data.employeeName);
    
    // Wait for dropdown and select first option
    this.elements.employeeNameDropdown().should('be.visible');
    this.elements.employeeNameOptions().first().click();

    // Select Status
    this.elements.statusDropdown().click();
    cy.get('[role="option"]').contains(data.status).click();

    // Fill username and passwords with better selectors
    this.getUsernameInput().clear().type(data.username);
    this.elements.passwordInput().clear().type(data.password);
    this.elements.confirmPasswordInput().clear().type(data.confirmPassword);
  }

  // ========== More reliable username input selector ==========
  getUsernameInput() {
    // Try multiple selector strategies
    return cy.get('input.oxd-input').then($inputs => {
      // Find the username input by its position or attributes
      const inputs = $inputs.toArray();
      
      // The username input is typically after employee name input
      // We'll find it by checking which input doesn't have specific attributes
      for (let i = 0; i < inputs.length; i++) {
        const input = inputs[i];
        const placeholder = input.getAttribute('placeholder');
        const type = input.getAttribute('type');
        
        // Skip password fields and employee name field
        if (type !== 'password' && placeholder !== 'Type for hints...') {
          // This is likely the username field
          return cy.wrap(input);
        }
      }
      
      // Fallback: use the input that comes after the labels
      return cy.get('input.oxd-input').eq(2);
    });
  }

  // ========== Alternative fill method using label-based selectors ==========
  fillFormByLabels(data) {
    // User Role
    cy.contains('label', 'User Role').parent().next().find('.oxd-select-text').click();
    cy.get('[role="option"]').contains(data.userRole).click();

    // Employee Name
    cy.contains('label', 'Employee Name').parent().next().find('input').type(data.employeeName);
    cy.get('.oxd-autocomplete-option').first().click();

    // Status
    cy.contains('label', 'Status').parent().next().find('.oxd-select-text').click();
    cy.get('[role="option"]').contains(data.status).click();

    // Username - find by label
    cy.contains('label', 'Username').parent().next().find('input').type(data.username);

    // Password
    cy.contains('label', 'Password').parent().next().find('input[type="password"]').type(data.password);

    // Confirm Password
    cy.contains('label', 'Confirm Password').parent().next().find('input[type="password"]').type(data.confirmPassword);
  }

  // ========== Click Save with validation ==========
  clickSave() {
    this.elements.saveButton()
      .should('be.visible')
      .should('not.be.disabled')
      .click();
  }

  // ========== Verify errors ==========
  verifyRequiredErrors() {
    this.elements.requiredErrors()
      .should('have.length.at.least', 1)
      .and('be.visible');
  }

  verifyPasswordMismatchError() {
    cy.contains('Passwords do not match').should('be.visible');
  }

  verifyUsernameExistsError() {
    cy.contains('Already exists').should('be.visible');
  }

  verifySuccessMessage() {
    this.elements.toastMessage()
      .should('be.visible')
      .and('contain', 'Successfully Saved');
  }

  // alias with option to use label-based filling
  fillUserForm(data, useLabels = true) {
    if (useLabels) {
      this.fillFormByLabels(data);
    } else {
      this.fillFormWithValidData(data);
    }
  }
}

export default new AddEmployeePage();