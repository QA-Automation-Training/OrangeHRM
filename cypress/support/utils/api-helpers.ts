import { EMPLOYEES_ENDPOINT, HTTP_METHODS, LEAVE_ENTITLEMENT_ENDPOINT, LEAVE_TYPES_ENDPOINT, USERS_ENDPOINT } from "../constants/endpoints";
import { CommonHelper } from "../helpers/common-helper";
import { LeaveInitializer } from "../initializers/leave-page/leave-page-initializer";
import { PIMInitializer } from "../initializers/pim-page/pim-page-initializer";
import { IEmployeeInfo } from "../types/employee";
import { ILeaveRequestData } from "../types/leave";

class APIsHelpers {
  /**
     *
     * @param {IEmployeeInfo} employeeInfo
     * @returns
     */
  static createEmployeeViaAPI(employeeInfo: IEmployeeInfo) {
    const payload = PIMInitializer.initializerEmployeePayload(employeeInfo);
    return CommonHelper.sendAPIRequest(
      HTTP_METHODS.POST,
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
    return CommonHelper.sendAPIRequest(HTTP_METHODS.POST, USERS_ENDPOINT, {
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

  /**
   * delete created user
   * @param {number []} empNumbers
   */
  static deleteUsers(empNumbers: number[]) {
    return CommonHelper.cleanup(EMPLOYEES_ENDPOINT, empNumbers);
  }

  /**
  * add laeve type
  * @param {ILeaveRequestData} leavePageInfo
  * @returns
  */
  static addLeaveType(leavePageInfo: ILeaveRequestData) {
    const payload = LeaveInitializer.initializerAddLeaveType(leavePageInfo);
    return CommonHelper.sendAPIRequest(
      HTTP_METHODS.POST,
      LEAVE_TYPES_ENDPOINT,
      payload
    ).then((response) => {
      return response;
    });
  }

  /**
   * add leave entitlements
   * @param {ILeaveRequestData} leavePageInfo
   * @param {number} empNumber
   * @param {number} leaveTypeId
   */
  static addLeaveEntitlements(
    leavePageInfo: ILeaveRequestData,
    empNumber: number,
    leaveTypeId: number
  ) {
    const payload = LeaveInitializer.initializerAddEntitlements(
      leavePageInfo,
      empNumber,
      leaveTypeId
    );
    return CommonHelper.sendAPIRequest(
      HTTP_METHODS.POST,
      LEAVE_ENTITLEMENT_ENDPOINT,
      payload
    ).then((response) => {
      return response;
    });
  }
}
export { APIsHelpers }