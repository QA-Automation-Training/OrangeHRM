// api-helpers.ts
import { EMPLOYEES_ENDPOINT, HTTP_METHODS, USERS_ENDPOINT } from "../constants/endpoints";
import { CommonHelper } from "../helpers/common-helper";
import { PIMInitializer, UserRole } from "../initializers/pim-page/pim-page-initializer";
import { IEmployeeInfo } from "../types/employee";

class APIsHelpers {

  static createEmployeeViaAPI(employeeInfo: IEmployeeInfo) {
    const payload = {
      firstName: employeeInfo.firstName,
      middleName: employeeInfo.middleName,
      lastName: employeeInfo.lastName,
      employeeId: employeeInfo.employeeId,
    };

    return CommonHelper.sendAPIRequest(HTTP_METHODS.POST, EMPLOYEES_ENDPOINT, payload)
      .then((response) => {
        if (response.status !== 200 && response.status !== 201) {
          throw new Error(`Failed to create employee: ${response.status}`);
        }
        return response;
      });
  }


  static createUserViaAPI(employeeInfo: IEmployeeInfo, empNumber: number) {
    const payload = {
      username: employeeInfo.userName,
      password: employeeInfo.password,
      status: employeeInfo.status,
      userRoleId: UserRole.ESS, 
    };

    return CommonHelper.sendAPIRequest(HTTP_METHODS.POST, USERS_ENDPOINT, {
      ...payload,
      empNumber,
    }).then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`Failed to create user: ${response.status}`);
      }
      return {
        response,
        credentials: {
          username: payload.username,
          password: payload.password,
        },
      };
    });
  }



  static createEmployeeAndLogin(employeeInfo: IEmployeeInfo) {
    return this.createEmployeeViaAPI(employeeInfo).then((empResponse) => {
      const empNumber = empResponse.body.data.empNumber;

      return this.createUserViaAPI(employeeInfo, empNumber).then((userData) => {

        return {
          empNumber,
          credentials: userData.credentials,
          employeeInfo,
        };
      });
    });
  }


  static generateEmployeeData(): IEmployeeInfo {
    const employeePayload = PIMInitializer.initializerEmployeePayload({} as IEmployeeInfo);
    const userPayload = PIMInitializer.initializerUserPayload({} as IEmployeeInfo);
    // cy.log(employeePayload.firstName + 'from helper')

    return {
      firstName: employeePayload.firstName,
      middleName: employeePayload.middleName,
      lastName: employeePayload.lastName,
      employeeId: employeePayload.employeeId,
      userName: userPayload.username,
      empNumber: 0,
      password: userPayload.password,
      status: userPayload.status,
    };
  }

  static deleteEmployees(empNumbers: number[]) {
    return CommonHelper.cleanup(EMPLOYEES_ENDPOINT, empNumbers);
  }
}

export { APIsHelpers };