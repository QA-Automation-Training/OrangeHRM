class EmployeeListPage {
  elements = {
    pimMenu: () => cy.get(".oxd-main-menu-item-wrapper").contains("PIM"),
    employeeListTab: () => cy.get(".oxd-topbar-body-nav-tab-item").contains("Employee List"),


    // '.oxd-table-filter-area' is the element that wraps all the filter fields
    // The callback gives access to the jQuery element ($el)
    // '.oxd-table-filter-header-options .--toggle button' is the button that opens the filter area
    // This ensures all input fields inside the filter become visible and interactable
    // This prevents the test from failing if the element is not yet loaded

    openFilttersArea: () => cy.get('.oxd-table-filter-area', { timeout: 5000 })
      .should('exist')
      .then($el => {
        if ($el.css('display') === 'none') {
          cy.get('.oxd-table-filter-header-options .--toggle button').click();
        }
      }),

    employeeName: () => cy.get('label')
      .contains('Employee Name')
      .closest('.oxd-input-group')
      .find('input'),


    employeeIdInput: () =>
      cy.get('label')
        .contains('Employee Id')
        .closest('.oxd-input-group')
        .find('input'),

    employmentStatusDropdown: () =>
      cy.contains('label', 'Employment Status')
        .closest('.oxd-input-group')
        .find('.oxd-select-text-input'),

    dropdownOption: () => cy.get('.oxd-select-dropdown'),

    includeDropdown: () =>
      cy.contains('label', 'Include')
        .closest('.oxd-input-group')
        .find('.oxd-select-text-input'),


    jobTitleDropdown: () =>
      cy.contains('label', 'Job Title')
        .closest('.oxd-input-group')
        .find('.oxd-select-text-input'),


    searchButton: () => cy.get('button[type="submit"]'),
    resetButton: () => cy.get('button[type="reset"]'),

    // Table elements - corrected selectors based on your HTML
    tableBody: () => cy.get('.oxd-table-body'),
    tableRows: () => cy.get('.oxd-table-card'),
    tableRow: (index: number) => cy.get('.oxd-table-card').eq(index),
    noRecordsFound: () => cy.contains('No Records Found'),



  };

  navigateToEmployeeList(): this {
    this.elements.pimMenu().click();
    this.elements.employeeListTab().click();
    cy.url().should("include", "/pim/viewEmployeeList");
    this.waitForLoading();
    return this;

  }
  waitForLoading() {
    cy.get('.oxd-loading-spinner').should('not.exist');
  }

  searchEmployeeBYName(employeeName): this {
    this.elements.employeeName().clear().type(employeeName);
    this.elements.searchButton().click();
    return this;
  }
  searchEmployeeBYId(employeeId): this {
    this.elements.employeeIdInput().clear().type(employeeId);
    this.elements.searchButton().click;
    return this;

  }

  // This method dynamically selects a dropdown option based on its visible text.
  // We locate the dropdown using its <label> (more stable than using index or order),
  // then click to open it and choose the matching option by content.
  // This approach is flexible and works even if the DOM structure or element order changes.
  selectEmploymentStatus(status) {
    this.elements.employmentStatusDropdown().click();
    this.elements.dropdownOption().contains(status).click();
  }
  selectEmployeeIncludeOption(option) {
    this.elements.includeDropdown().click();
    this.elements.dropdownOption().contains(option).click();
  }

  selectEmloyeeJobTitle(title) {
    this.elements.jobTitleDropdown().click();
    this.elements.dropdownOption().contains(title).click();
  }
   

  

}

export default EmployeeListPage;
