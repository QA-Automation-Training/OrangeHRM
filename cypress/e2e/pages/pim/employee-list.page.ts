class EmployeeListPage {
  elements = {
  employeeName: ()=>cy.get('input[placeholder="Type for hints..."]'),  
employeeIdInput: () =>
    cy.get('label')
      .contains('Employee Id')
      .closest('.oxd-input-group')//move to upper level on step 
      .find('input'),

    
    
  };

  navigateToEmployeeList(): this {
    // TODO: Click PIM menu
    // TODO: Wait for employee list page URL
  }

  searchEmployee(employeeName): this {
    // TODO: Type employee name in search input
    // TODO: Click search button
  }

  verifyEmployeeInList(employeeName): this {
    // TODO: Check that search results have at least 1 row
    // TODO: Check that employee name exists in results
  }
}

export default EmployeeListPage;
