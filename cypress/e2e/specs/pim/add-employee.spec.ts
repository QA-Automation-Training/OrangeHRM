// cypress/e2e/specs/pim/add-employee-basic.spec.ts
import AddEmployeePage from '../../pages/pim/add-employee.page';

describe('PIM - Add Employee Basic Smoke Test', () => {
  const addEmployeePage = new AddEmployeePage();

  beforeEach(() => {
    cy.loginToOrangeHRM();
    cy.fixture('users/employees').as('employeesData');

 
  });
  it('TC-PIM-BASIC-001: Should navigate to Add Employee and fill personal & login details successfully', function () {
    const employee = this.employeesData[0];
    addEmployeePage.navigateToAddEmployee();

    addEmployeePage.fillPersonalDetails(
      employee.firstName,
      employee.middleName,
      employee.lastName,
      employee.employeeId
    );

    // Assertions for personal details
    addEmployeePage.elements.firstNameInput().should('have.value', employee.firstName);
    addEmployeePage.elements.middlleNameInput().should('have.value', employee.middleName);
    addEmployeePage.elements.lastNameInput().should('have.value', employee.lastName);
    addEmployeePage.elements.employeeIdInput().should('have.value', employee.employeeId);

    addEmployeePage.elements.saveButton().should('be.visible');

    // Enable login details section
    addEmployeePage.enableLoginDetails();

    // Fill login details
    addEmployeePage.fillLoginDetails(
      `${employee.firstName.toLowerCase()}.${employee.lastName.toLowerCase()}`,
      'StrongPass@123',
      'StrongPass@123',
      'Enabled'
    );

    addEmployeePage.elements.usernameInput().should(
      'have.value',
      `${employee.firstName.toLowerCase()}.${employee.lastName.toLowerCase()}`
    );
    addEmployeePage.elements.passwordInput().should('have.value', 'StrongPass@123');
    addEmployeePage.elements.confirmPasswordInput().should('have.value', 'StrongPass@123');

    addEmployeePage.save();
  });
});
