import { IEmployeeInfo } from "../../types/employee";
import { faker } from "@faker-js/faker";

export enum UserRole {
  ADMIN = 1,
  ESS = 2,
}

class PIMInitializer {
/**
   * Creates and returns a formatted payload for employee creation API request
   * Uses faker library to generate random realistic data for testing
   * @param {IEmployeeInfo} employeeData - Basic employee information
   * @returns {Object} Formatted payload ready for API consumption
   */
  static initializerEmployeePayload(employeeData: IEmployeeInfo) {
    const payload = {
      firstName: faker.person.firstName(),
      middleName: faker.person.middleName(),
      lastName: faker.person.lastName(),
      employeeId: faker.number.int({ min: 1000, max: 9999 }).toString(),
    };
    return payload;
  }

   /**
   * Creates and returns a formatted payload for user account creation API request
   * Generates secure credentials and assigns appropriate user role
   * @param {IEmployeeInfo} employeeData - Basic employee information
   * @returns {Object} Formatted user payload with credentials and role
   */
  static initializerUserPayload(employeeData: IEmployeeInfo) {
    const payload = {
      username: faker.internet.username(),
      password: faker.internet.password({ prefix: "yo12" }),
      status: employeeData.status ?? faker.datatype.boolean(),
      userRoleId: UserRole.ESS,
    };
    return payload;
  }
}
export { PIMInitializer };
