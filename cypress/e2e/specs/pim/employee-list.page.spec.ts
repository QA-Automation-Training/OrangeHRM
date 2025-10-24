import EmployeeListPage from "../../pages/pim/employee-list.page";
const employeeListPage = new EmployeeListPage();

describe("PIM Employee List Page", () => { 
  beforeEach(() => {  
    cy.loginToOrangeHRM();
    employeeListPage.navigateToEmployeeList();
    employeeListPage.elements.openFilttersArea();
  });

  it("should search for an employee by name", () => { 
    employeeListPage.searchEmployeeBYName("Shakira Alex Dickinson")
    .searchEmployeeBYName("John Smith");
  });

  

  it('should filter employees by employment status', () => {
    cy.fixture("pim/employmentStatus").then((data) => {
      data.statuses.forEach((status) => {
        employeeListPage.selectEmploymentStatus(status);
        // Optional: verify results
        cy.get('.oxd-table-row').should('exist');

      });

    });


  });

  it('should filter employees by include option', () => {
    cy.fixture("pim/includeOptions").then((data) => {
      data.options.forEach(option => {
        employeeListPage.selectEmployeeIncludeOption( option)  // Page Object method
        cy.get('.oxd-table-row').should('exist');
      });
    });
  });
   

});
