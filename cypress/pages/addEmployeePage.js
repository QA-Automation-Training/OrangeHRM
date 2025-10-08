// cypress/pages/addEmployeePage.js
class AddEmployeePage {
  elements = {
    // Dropdowns and fields
    userRoleDropdown: () => cy.get('.oxd-select-text').eq(0),
    userRoleOption: (role) => cy.contains('div[role="option"]', role),
    
    employeeNameInput: () => cy.get('input[placeholder="Type for hints..."]'),
    employeeNameOption: () => cy.get('.oxd-autocomplete-option').first(),
    
    statusDropdown: () => cy.get('.oxd-select-text').eq(1),
    statusOption: (status) => cy.contains('div[role="option"]', status),
    
    usernameInput: () => cy.get('input.oxd-input').eq(1),
    passwordInput: () => cy.get('input[type="password"]').eq(0),
    confirmPasswordInput: () => cy.get('input[type="password"]').eq(1),
    
    saveButton: () => cy.get('input[type="submit"]'),
    
    // Error messages
    requiredError: () => cy.contains('Required'),
    passwordMismatchError: () => cy.contains('Passwords do not match'),
    usernameExistsError: () => cy.contains('Already exists')
  };

  // ========== Fill form ==========
  fillFormWithValidData(data) {
    // Select User Role
    this.elements.userRoleDropdown().click({ force: true });
    cy.wait(500);
    this.elements.userRoleOption(data.userRole).click({ force: true });

    // Type Employee Name
    this.elements.employeeNameInput().clear().type(data.employeeName, { force: true });
    cy.wait(2000);
    cy.get('.oxd-autocomplete-dropdown').should('be.visible');
    this.elements.employeeNameOption().click({ force: true });

    // Select Status
    this.elements.statusDropdown().click({ force: true });
    cy.wait(500);
    this.elements.statusOption(data.status).click({ force: true });

    // Fill username and passwords
    this.elements.usernameInput().clear().type(data.username, { force: true });
    this.elements.passwordInput().clear().type(data.password, { force: true });
    this.elements.confirmPasswordInput().clear().type(data.confirmPassword, { force: true });
  }

  // ========== Click Save ==========
  clickSave() {
    this.elements.saveButton().should('be.visible').click({ force: true });
  }

  // ========== Navigate back to users list ==========
  navigateToUsersList() {
    cy.contains('Admin').click();
    cy.wait(2000);
  }

  // ========== Verify user in list ==========
  verifyUserInList(username) {
    cy.wait(2000);
    // البحث عن المستخدم
    cy.get('.oxd-input').eq(1).clear().type(username);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    
    // التحقق من ظهوره
    cy.contains(username, { timeout: 5000 }).should('be.visible');
  }

  // ========== Verify errors ==========
  verifyRequiredErrors() {
    this.elements.requiredError().should('be.visible');
  }

  verifyPasswordMismatchError() {
    this.elements.passwordMismatchError().should('be.visible');
  }

  verifyUsernameExistsError() {
    this.elements.usernameExistsError().should('be.visible');
  }

  // alias
  fillUserForm(data) {
    this.fillFormWithValidData(data);
  }
}

export default new AddEmployeePage();