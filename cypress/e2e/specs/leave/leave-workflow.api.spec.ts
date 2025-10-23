// Test cases to create:

import { LeavePage } from "@pages/leave/add-leave-request";
import { IEmployeeInfo } from "cypress/support/types/employee";
import { ILeaveRequestData } from "cypress/support/types/leave";
import { APIsHelpers } from "cypress/support/utils/api-helpers";

// TC1: Create 5 employees via API

// TC2: Assign leave entitlement to each employee

// TC3: Employee applies for leave and admin approves

describe("Leave page test cases", () => {
  let leavePage: LeavePage;
  let leavePageInfo: ILeaveRequestData;
  let employeeMockData: IEmployeeInfo;
  let employeeInfo: IEmployeeInfo;

  const employeeIds: number[] = [];
  const leaveTypeIds: number[] = [];
  const credentialsList: Array<{ username: string; password: string }> = [];
  const createdEmployees: IEmployeeInfo[] = [];

  before(() => {
    // Initialize fixtures
    cy.fixture("leave-page-mock").then((leavePageData) => {
      leavePageInfo = leavePageData;
    });

    cy.fixture("employee-page-mock").then((addEmployeeData) => {
      employeeMockData = addEmployeeData;
      employeeInfo = structuredClone(employeeMockData);
    });

    leavePage = new LeavePage();
  });

  beforeEach(() => {
    employeeIds.length = 0;
    leaveTypeIds.length = 0;
    credentialsList.length = 0;

    cy.loginToOrangeHRM();

    APIsHelpers.createMultipleEmployees(employeeInfo, employeeIds, 5).then((employees) => {
      createdEmployees.push(...employees);
      const empNumbers = employees.map((e) => e.empNumber);

      APIsHelpers.createUsersForEachEmployee(createdEmployees).then((credentials) => {
        credentialsList.push(...credentials);
      });

      APIsHelpers.addLeaveType(leavePageInfo).then((response) => {
        const leaveId = response.body.data.id;
        leaveTypeIds.push(leaveId);
        APIsHelpers.addLeaveEntitlementsForEachEmployee(leavePageInfo, empNumbers, leaveId);
      });
    });

    cy.logout();
  });

  it("Apply for leave request and admin approve the leave", () => {
    // Each employee applies for a leave
    cy.wrap(credentialsList).each((credential: { username: string; password: string }) => {
      cy.loginToOrangeHRM(credential.username, credential.password);

      leavePage
        .navigateToLeavePage()
        .clickApplyTab()
        .selectLeaveType(leavePageInfo.leaveTypeName)
        .selectFromDate(leavePageInfo.entitlementFromDate)
        .selectToDate(leavePageInfo.entitlementEndDate)
        .clickApply();

      cy.wait(3000);
      cy.logout();
    })
      .then(() => {
        // Admin logs in and approves all pending leave requests
        cy.loginToOrangeHRM();

        leavePage
          .navigateToLeavePage()
          .approveMultipleLeaveRequests(createdEmployees);
      });
  });

  afterEach(() => {
    cy.logout();
    cy.loginToOrangeHRM();
    APIsHelpers.deleteUsers(employeeIds);
  });
});

