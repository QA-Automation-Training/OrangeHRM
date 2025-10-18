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
    .searchEmployeeBYName("John Smith")
    .verifySearchResultsContain('John Smith');
  });

  it("should search for an employee by ID", () => { 
    employeeListPage.searchEmployeeBYId("12345").verifySearchResultsContain('12345');
  });

  it('should filter employees by employment status', () => {
    cy.fixture("employmentStatus").then((data) => {
      data.statuses.forEach((status) => {
        employeeListPage.selectEmploymentStatus(status);
        // Optional: verify results
        cy.get('.oxd-table-row').should('exist');

      });

    });


  });

  it('should filter employees by include option', () => {
    cy.fixture("includeOptions").then((data) => {
      data.options.forEach(option => {
        employeeListPage.selectEmployeeIncludeOption( option)  // Page Object method
        cy.get('.oxd-table-row').should('exist');
      });
    });
  });
    it('should filter employees by job title', () => {
        cy.fixture("jobTitles").then((data) => {
            data.titles.forEach(title => {
                employeeListPage.selectEmloyeeJobTitle(title);  // Page Object method
                cy.get('.oxd-table-row').should('exist');
            });
        });

    });

});
