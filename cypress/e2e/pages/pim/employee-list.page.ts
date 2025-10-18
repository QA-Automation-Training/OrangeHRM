// class EmployeeListPage {
//   elements = {
//     pimMenu: () => cy.get(".oxd-main-menu-item-wrapper").contains("PIM"),
//     employeeListTab: () => cy.get(".oxd-topbar-body-nav-tab-item").contains("Employee List"),
//     employeeName: () => cy.get('input[placeholder="Type for hints..."]'),
//     employeeIdInput: () =>
//       cy.get('label')
//         .contains('Employee Id')
//         .closest('.oxd-input-group')//move to upper level on step 
//         .find('input'),

//     searchButton: () => cy.get('button[type="submit"]'),


//   };

//   navigateToEmployeeList(): this {
//     // TODO: Click PIM menu
//     this.elements.pimMenu().click();
//     this.elements.employeeListTab().click();
//     cy.url().should("include", "/pim/viewEmployeeList");
//     this.waitForLoading();
//     return this;

//   }
//   waitForLoading() {
//     cy.get('.oxd-loading-spinner').should('not.exist');
//   }

//   searchEmployee(employeeName): this {
//     this.elements.employeeName().clear().type(employeeName);
//     // TODO: Click search button
//     this.elements.searchButton().click();
//     return this;
//   }

//   verifyEmployeeInList(employeeName): this {
//     // TODO: Check that search results have at least 1 row
//     // TODO: Check that employee name exists in results
//   }
// }

// export default EmployeeListPage;
