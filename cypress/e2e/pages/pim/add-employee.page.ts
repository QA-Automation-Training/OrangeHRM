class AddEmployeePage {
  elements = {
    pimMenu: () => cy.get(".oxd-main-menu-item-wrapper").contains("PIM"),
    addEmloyeeTab: () =>
      cy.get(".oxd-topbar-body-nav-tab").contains("Add Employee"),
    firstNameInput: () => cy.get('input[name="firstName"]'),
    middlleNameInput: () => cy.get('input[name="middleName"]'),
    lastNameInput: () => cy.get('input[name="lastName"]'),
    // cy.contains('label', 'Employee Id') → finds the <label> element with text 'Employee Id'
    // .closest('.oxd-input-group') → moves up the DOM tree to the nearest parent element with class '.oxd-input-group' that contains both the label and the input
    // .find('input') → searches for the <input> inside that parent element, even if it’s nested deeper
    // Why this works: the <input> is not a direct sibling of the <label>, so searching within the parent ensures we reliably find the input regardless of small DOM structure changes.

    employeeIdInput: () =>
      cy
        .contains("label", "Employee Id") // find the label
        .closest(".oxd-input-group") // go up to the input group container
        .find("input"), // then find the input inside it

    // Define selectors for login details toggle, username, password, confirm password
    createLoginDetailsToggle: () => cy.get('.oxd-switch-input'), usernameInput: () =>
      cy
        .contains("label", "Username") // find the <label> element with text "Username"
        .closest(".oxd-input-group") // go up the DOM to the parent container that holds both label and input
        .find("input"),

    statusEnabledRadio: () =>
      cy.get('input[type="radio"][value="1"]').parent().contains("Enabled"),
    statusDisabledRadio: () =>
      cy.get('input[type="radio"][value="2"]').parent().contains('Disabled'),

    passwordInput: () =>
      cy
        .contains("label", "Password")
        .closest(".oxd-input-group")
        .find("input"),
    confirmPasswordInput: () =>
      cy
        .contains("label", "Confirm Password")
        .closest(".oxd-input-group")
        .find("input"),
    saveButton: () => cy.get('button[type="submit"]'),
    cancelButton: () => cy.get('button[type="button"]').contains("Cancel"),
  };

  navigateToAddEmployee(): this {
    this.elements.pimMenu().click();
    cy.url().should("include", "/pim");
    this.waitForLoading();
    this.elements.addEmloyeeTab().click();
    cy.url().should("include", "/pim/addEmployee");
    return this;
  }

  fillPersonalDetails(firstName, middleName, lastName, employeeId?): this {
    this.elements.firstNameInput().should("be.visible").type(firstName);
    this.elements.middlleNameInput().should("be.visible").type(middleName);
    this.elements.lastNameInput().should("be.visible").type(lastName);
    if (employeeId) {
      this.elements.employeeIdInput().clear().type(employeeId);
    }
    return this;
  }

  enableLoginDetails(): this {
    this.elements.createLoginDetailsToggle().click();
    return this;
  }

  fillLoginDetails(username: string, password: string, confirmPassword: string, status: 'Enabled' | 'Disabled'): this {
    if (status === "Enabled") {
      this.elements.statusEnabledRadio().click({ force: true });
    } else {
      this.elements.statusDisabledRadio().click({ force: true });
    }

    // TODO: Fill username, password, confirm password
    this.elements.usernameInput().clear().type(username);
    this.elements.passwordInput().clear().type(password);
    this.elements.confirmPasswordInput().clear().type(confirmPassword);
    return this;
  }

  save(): this {
    this.elements.saveButton().click();
    return this;
  }

  verifySuccess(): this {
    // TODO: Verify success message
    // TODO: Optionally check URL redirected to employee list
  }

  waitForLoading(): this {
    // TODO: Wait until any loading spinner disappears
  }

  addEmployeeWithLogin(employeeData): this {
    // TODO: Complete workflow using above methods
  }

  addEmployeeWithoutLogin(employeeData): this {
    // TODO: Complete workflow for employee without login
  }
}

export default AddEmployeePage;
