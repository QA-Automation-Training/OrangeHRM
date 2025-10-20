/**
 * ============================================================
 * 🔧 FILE: api-helpers.ts
 * PURPOSE:
 * - Contains reusable functions that send direct HTTP API requests
 *   for the OrangeHRM backend.
 * - Used by custom Cypress commands for API testing.
 *
 * ============================================================
 * 🧠 WHAT'S INSIDE:
 * 1️⃣ loginViaAPI(username, password)
 *     → Handles authentication by sending POST request to /auth/login.
 *     → Must be called before any other API that requires authorization.
 *
 * 2️⃣ addNewEmployeeViaAPI(employeeData)
 *     → Sends POST request to create a new employee record.
 *     → Takes employee data (firstName, lastName, etc.) as parameter.
 *
 * 3️⃣ assignLeaveEntitlementViaAPI(employeeId, leaveData)
 *     → Sends POST request to assign leave entitlement for employee.
 *
 * 4️⃣ applyLeaveViaAPI(employeeId, leaveData)
 *     → Employee applies for leave via API.
 *
 * 5️⃣ approveLeaveViaAPI(leaveRequestId)
 *     → Admin approves leave request.
 *
 * 6️⃣ bulkCreateEmployeesViaAPI(employees)
 *     → Helper to create multiple employees at once.
 *
 * ============================================================
 * 🧰 WHAT YOU NEED TO DO:
 * ✅ Implement loginViaAPI() function (authentication).
 * ✅ Verify addNewEmployeeViaAPI() works correctly for Add Employee API.
 * ✅ Use this helper inside pim.api.commands.ts to build custom commands.
 *
 * ============================================================
 */
