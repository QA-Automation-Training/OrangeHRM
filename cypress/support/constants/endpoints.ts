/**
 * ============================================================
 * FILE: endpoints.ts
 * PURPOSE:
 * - Central file for storing all backend API endpoint URLs.
 * - Prevents hardcoding URLs inside test files.
 *
 * ============================================================
 *
 * ============================================================
 * 🧰 WHAT YOU NEED TO DO:
 * ✅ Add missing endpoints for authentication, employees, and leave APIs.
 * ✅ Import them in api-helpers.ts when making requests.
 * ============================================================
 */

export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export const LOGIN_ENDPOINT = '/web/index.php/api/v2/auth/login';
export const EMPLOYEES_ENDPOINT = '/web/index.php/api/v2/pim/employees';
export const USERS_ENDPOINT = '/web/index.php/api/v2/admin/users';
export const LEAVE_ENTITLEMENT_ENDPOINT = '/web/index.php/api/v2/leave/entitlements';
export const LEAVE_REQUEST_ENDPOINT = '/web/index.php/api/v2/leave/requests';
export const LEAVE_APPROVAL_ENDPOINT = '/web/index.php/api/v2/leave/requests/action';
export const LEAVE_TYPES_ENDPOINT = '/web/index.php/api/v2/leave/leave-types';
export const ADD_LEAVE_ENTITLEMENT_ENDPOINT = '/web/index.php/api/v2/leave/leave-entitlements';

