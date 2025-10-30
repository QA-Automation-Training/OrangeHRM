// create-employee.spec.ts
import { APIsHelpers } from 'cypress/support/helpers/api-helpers';
import { IEmployeeInfo } from 'cypress/support/types/employee';
import ClaimPage from 'cypress/e2e/pages/claim/employee-claim';

describe('Employee Creation and Login', () => {
  let employeeCredentials: { username: string; password: string };
  let employeeInfo: IEmployeeInfo;
  let currencyData: { currencies: string[] };
  let eventData: { events: string[] };
  let expenseTypeData: { expenseTypes: string[] };

  const claimPage = new ClaimPage();

  before(() => {
    cy.fixture('claim/currency-options.json').then((currencyInfo) => {
      currencyData = currencyInfo;
    })

    cy.fixture('claim/event-options.json').then((eventInfo) => {
      eventData = eventInfo;
    })

    cy.fixture('claim/expense-type.json').then((expenseTypeInfo) => {
      expenseTypeData = expenseTypeInfo;
    })
  })

  beforeEach(() => {
    cy.loginToOrangeHRM();

    const employeeData = APIsHelpers.generateEmployeeData();

    return APIsHelpers.createEmployeeAndLogin(employeeData).then((result) => {
      employeeCredentials = result.credentials;
      employeeInfo = result.employeeInfo;

      cy.logout();
      cy.loginToOrangeHRM(employeeCredentials.username, employeeCredentials.password);

      cy.url().should('include', '/dashboard');
    });
  });


  it('should create 3 different Claims for 3 Different Currencies', () => {

    const currencies: string[] = currencyData.currencies.slice(0, 3);
    const expenseTypes: string[] = expenseTypeData.expenseTypes.slice(0, 3);
    const eventName: string = 'Medical Reimbursement';

    claimPage.navigateToCreateClaim();

    currencies.forEach((currency, index) => {
      const expenseType = expenseTypes[index];

      claimPage.selectEvent(eventName);
      claimPage.selectCurrency(currency);
      claimPage.clickSubmit();
      claimPage.addExpense(expenseType);
      claimPage.clickSubmitButton();

      // cy.get('.oxd-toast-content').should('contain.text', 'Successfully Submitted');

      claimPage.navigateToCreateClaim();
    });
  });

  afterEach(() => {
    if (employeeInfo && employeeInfo.empNumber) {
      cy.visit('/web/index.php/auth/logout');
      cy.loginToOrangeHRM('admin', 'admin123');

      cy.then(() => {
        return APIsHelpers.deleteEmployees([employeeInfo.empNumber]);
      });
    }
  });
})