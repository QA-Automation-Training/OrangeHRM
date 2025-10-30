// create-employee.spec.ts
import { APIsHelpers } from 'cypress/support/helpers/api-helpers';
import { IEmployeeInfo } from 'cypress/support/types/employee';
import ClaimPage from 'cypress/e2e/pages/claim/employee-claim';

describe('Employee Creation and Login', () => {
  let employeeCredentials: { username: string; password: string };
  let employeeInfo: IEmployeeInfo;
  let currencyData: { currencies: string[] };
  let eventData: { events: string[] };

  const claimPage = new ClaimPage();

  before(() => {
    cy.fixture('claim/currency-options.json').then((currencyInfo) => {
      currencyData = currencyInfo;
      cy.fixture('claim/event-options.json').then((eventInfo) => {
        eventData = eventInfo;
      })
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


  it('should create 5 different Claims for 5 Different Currencies', () => {

    const currencies: string[] = currencyData.currencies.slice(0, 5);
    const eventName: string = 'Medical Reimbursement';

    claimPage.navigateToCreateClaim();

    currencies.forEach((currency) => {
      claimPage.selectEvent(eventName);
      claimPage.selectCurrency(currency);
      claimPage.clickSubmit();

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