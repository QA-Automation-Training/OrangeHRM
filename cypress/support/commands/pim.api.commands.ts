/**
 * ============================================================
 * 🔧 FILE: pim.api.commands.ts
 * PURPOSE:
 * - Defines custom Cypress commands to interact with the PIM (Employee Management) API.
 * - Uses helper functions from api-helpers.ts.
 *
 * ============================================================
 * 🧠 WHAT'S INSIDE:
 * 1️⃣ cy.createEmployeeViaAPI(employeeData?)
 *     → Uses addNewEmployeeViaAPI() to create a single employee.
 *     → Generates random data if none is provided.
 *
 * 2️⃣ cy.assignLeaveBalanceViaAPI(employeeId, leaveData?)
 *     → Assigns leave entitlement to an employee.
 *
 * 3️⃣ cy.createMultipleEmployeesViaAPI(count?)
 *     → Creates multiple employees in bulk for testing.
 *
 * ============================================================
 * 📦 DEPENDENCIES:
 * - api-helpers.ts → (import addNewEmployeeViaAPI, assignLeaveEntitlementViaAPI)
 * - data-generator.ts → (generateEmployeeData, generateMultipleEmployees)
 *
 * ============================================================
 * 🧰 WHAT YOU NEED TO DO:
 * ✅ Use addNewEmployeeViaAPI() from utils/api-helpers.ts here.
 * ✅ Add expect() checks for response.status === 200.
 * ✅ Return created employee data for use in your test specs.
 *
 * ============================================================
 * 📌 REMINDER:
 * - Declare TypeScript typings for new commands under `declare global`.
 * - This helps with IntelliSense and type checking in Cypress.
 *
 * ============================================================
 */
