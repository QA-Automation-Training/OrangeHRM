declare namespace Cypress {
  interface Chainable {
    // Custom commands can be added here if needed
    loginToOrangeHRM(): Chainable<void>;
  }
}

// Extend Cypress types for custom configuration
declare global {
  namespace Cypress {
    interface ConfigOptions {
      retryOnStatusCodeFailure?: boolean;
      retryOnNetworkFailure?: boolean;
    }
  }
}
// TODO: Extend Cypress Chainable for custom commands:
// - loginToOrangeHRM()
// - generateEmployeeData()

// TODO: Define EmployeeData interface:
// - firstName, middleName, lastName, employeeId?, username?, password?
