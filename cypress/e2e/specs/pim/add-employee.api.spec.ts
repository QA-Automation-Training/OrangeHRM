/**
 * ============================================================
 * 🧪 FILE: add-employee.api.spec.ts
 * PURPOSE:
 * - Main PIM test suite for Add Employee feature using API.
 * - Verifies multiple employee creation, leave assignment,
 *   and employee existence in system.
 *
 * ============================================================
 * 🧠 TEST CASES INCLUDED:
 * 🔹 TC1: Create 5 employees via API.
 * 🔹 TC2: Assign leave entitlement to each created employee.
 * 🔹 TC3: Verify all employees exist in the system (GET request check).
 *
 * ============================================================
 * 🔁 TEST FLOW:
 * before()  → Setup (login via API)
 * it(TC1)   → Create multiple employees
 * it(TC2)   → Assign leave entitlement
 * it(TC3)   → Verify existence via GET
 * after()   → Cleanup (optional: delete employees)
 *
 * ============================================================
 * 🧰 WHAT YOU NEED TO DO:
 * ✅ Run this file after verifying that loginViaAPI() works.
 * ✅ Make sure `createMultipleEmployeesViaAPI()` returns valid employee objects.
 * ✅ Add GET request in TC3 to confirm employees were created.
 * ✅ Implement cleanup (optional) later.
 *
 * ============================================================
 * 💡 TIP:
 * Use `cy.log()` generously to track progress and employee data.
 * This helps debug test failures quickly.
 *
 * ============================================================
 */
