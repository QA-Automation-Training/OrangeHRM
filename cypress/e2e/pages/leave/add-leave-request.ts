class LeavePage {
  elements = {
    leaveMenuItem: () => cy.get('.oxd-main-menu-item-wrapper').contains('Leave'),
    topbarNav: () => cy.get('.oxd-topbar-body-nav'),
    applyTab: () => cy.get('.oxd-topbar-body-nav-tab').contains('Apply'),
    autoCompleteDropdown: () => cy.get('.oxd-autocomplete-dropdown'),
    employeeNameInput: () =>
      cy.contains('label', 'Employee Name')
        .closest('.oxd-input-group')
        .find('input'),
    leaveTypeSelect: () =>
      cy.contains('label', 'Leave Type')
        .closest('.oxd-input-group')
        .find('.oxd-select-text'),
    fromDateInput: () =>
      cy.contains('label', 'From Date')
        .closest('.oxd-input-group')
        .find('input'),
    toDateInput: () =>
      cy.contains('label', 'To Date')
        .closest('.oxd-input-group')
        .find('input'),
    applyButton: () => cy.get('button[type="submit"]').contains('Apply'),
    searchButton: () => cy.get('button').contains('Search'),
    approveButton: () => cy.get('button').contains('Approve'),
  };

  navigateToLeavePage(): this {
    this.elements.leaveMenuItem().click();
    cy.url().should('include', '/leave');
    return this;
  }

  clickApplyTab(): this {
    this.elements.topbarNav().contains('Apply').click();
    cy.url().should('include', '/leave/applyLeave');
    return this;
  }

  selectLeaveType(leaveType: string): this {
    this.elements.leaveTypeSelect().click();
    cy.get('.oxd-select-dropdown').contains(leaveType).click();
    return this;
  }

  typeEmployeeName(employeeName: string): this {
    this.elements.employeeNameInput().clear().type(employeeName);
    this.elements.autoCompleteDropdown().contains(employeeName).click();
    return this;
  }

  selectFromDate(fromDate: string): this {
    this.elements.fromDateInput().clear().type(fromDate);
    return this;
  }

  selectToDate(toDate: string): this {
    this.elements.toDateInput().clear().type(toDate);
    return this;
  }

  clickApply(): this {
    this.elements.applyButton().click();
    return this;
  }

  clickSearch(): this {
    this.elements.searchButton().click();
    return this;
  }

  clickApprove(): this {
    this.elements.approveButton().click({ force: true });
    return this;
  }

  approveLeaveRequestForEmployee(employeeName: string): this {
    this.typeEmployeeName(employeeName)
      .clickSearch()
      .clickApprove();
    return this;
  }

  approveMultipleLeaveRequests(employees: { firstName: string }[]): this {
    employees.forEach(emp => {
      this.approveLeaveRequestForEmployee(emp.firstName);
    });
    return this;
  }

}
export { LeavePage }