import { EMPLOYEES_ENDPOINT, USERS_ENDPOINT } from "../constants/endpoints";
import { CommonHelper } from "../helpers/common-helper";
import { PIMInitializer } from "../initializers/pim-page/pim-page-initializer";
import { IEmployeeInfo } from "../types/employee";

class APIsHelpers {
  /**
     *
     * @param {IEmployeeInfo} employeeInfo
     * @returns
     */
  static createEmployeeViaAPI(employeeInfo: IEmployeeInfo) {
    const payload = PIMInitializer.initializerEmployeePayload(employeeInfo);
    return CommonHelper.sendAPIRequest(
      "POST",
      EMPLOYEES_ENDPOINT,
      payload
    ).then((response) => {
      return response;
    });
  }

  /**
  * add username and password for the employee
  * @param {IEmployeeInfo} employeeInfo
  * @param {number} empNumber
  * @returns
  */
  static createUserViaAPI(employeeInfo: IEmployeeInfo, empNumber: number) {
    const payload = PIMInitializer.initializerUserPayload(employeeInfo);
    return CommonHelper.sendAPIRequest("POST", USERS_ENDPOINT, {
      ...payload,
      empNumber,
    }).then((response) => {
      return {
        response,
        credentials: {
          username: payload.username,
          password: payload.password,
        },
      };
    });
  }
}
export { APIsHelpers }