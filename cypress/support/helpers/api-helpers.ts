// api-helpers.ts
import { EMPLOYEES_ENDPOINT, USERS_ENDPOINT } from "../constants/endpoints";
import { CommonHelper } from "../helpers/common-helper";
import { PIMInitializer } from "../initializers/pim-page/pim-page-initializer";
import { IEmployeeInfo } from "../types/employee";

class APIsHelpers {
  /**
   * Creates a new employee in the system via API call
   * This method assumes admin user is already logged in to have proper permissions
   * @param {IEmployeeInfo} employeeInfo - Employee data containing personal information
   * @returns {Promise} API response containing created employee data including empNumber
   */
  static createEmployeeViaAPI(employeeInfo: IEmployeeInfo) {
    // Generate properly formatted payload using PIMInitializer
    const payload = PIMInitializer.initializerEmployeePayload(employeeInfo);
    
    return CommonHelper.sendAPIRequest("POST", EMPLOYEES_ENDPOINT, payload)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error(`Failed to create employee: ${response.status}`);
        }
        return response;
      });
  }

  /**
   * Creates a user account for an existing employee with login credentials
   * Links the user account to the employee using empNumber
   * @param {IEmployeeInfo} employeeInfo - Employee data for username/password generation
   * @param {number} empNumber - Unique employee identifier from the system
   * @returns {Promise} Object containing API response and login credentials
   */

  static createUserViaAPI(employeeInfo: IEmployeeInfo, empNumber: number) {
    // Generate user account payload with credentials
    const payload = PIMInitializer.initializerUserPayload(employeeInfo);
    
    // Send POST request to users endpoint with employee number
    return CommonHelper.sendAPIRequest("POST", USERS_ENDPOINT, {
      ...payload,
      empNumber,
    }).then((response) => {
      // Validate response status for successful user creation
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Failed to create user: ${response.status}`);
      }
      // Return both API response and credentials for later use
      return {
        response,
        credentials: {
          username: payload.username,
          password: payload.password,
        },
      };
    });
  }

  /**
   * Complete end-to-end workflow: creates employee, creates user account, and returns credentials
   * This is the main method used in tests for setting up test employees
   * @param {IEmployeeInfo} employeeInfo - Complete employee information
   * @returns {Promise} Object containing empNumber, credentials, and original employee info
   */

  static createEmployeeAndLogin(employeeInfo: IEmployeeInfo) {
    return this.createEmployeeViaAPI(employeeInfo).then((empResponse) => {
      const empNumber = empResponse.body.data.empNumber;

      return this.createUserViaAPI(employeeInfo, empNumber).then((userData) => {
        const { username, password } = userData.credentials;

        return {
          empNumber,                    // System-generated employee ID
          credentials: userData.credentials, // Login credentials {username, password}
          employeeInfo,                 // Original employee data for reference
        };
      });
    });
  }

  /**
   * Generates random employee data for automated testing
   * Creates unique data each time to avoid conflicts in test runs
   * @returns {IEmployeeInfo} Complete employee data object with random values
   */
  static generateEmployeeData(): IEmployeeInfo {
    const randomId = Math.floor(Math.random() * 10000);
    return {
      firstName: "Test",                // Standard first name for test users
      middleName: "Automation",         // Standard middle name identifier
      lastName: "User",                 // Standard last name for test users
      employeeId: `${randomId}`,        // Unique employee ID
      userName: `testuser${randomId}`,  // Unique username based on random ID
      empNumber: 0,                     // Will be populated by system after creation
      password: "TestPassword123",      // Standard test password
      status: true,                     // Active employee status
    };
  }

  /**
   * Cleans up test data by deleting employees after test execution
   * Helps maintain clean test environment and prevent data accumulation
   * @param {number[]} empNumbers - Array of employee numbers to delete
   * @returns {Promise} API response from delete operation
   */
  static deleteEmployees(empNumbers: number[]) {
    // Send DELETE request to remove multiple employees
    return CommonHelper.cleanup(EMPLOYEES_ENDPOINT, empNumbers);
  }
}

export { APIsHelpers };