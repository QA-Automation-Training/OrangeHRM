# Employee API Testing Guide

This guide explains how to use the API testing functionality for adding employees in OrangeHRM.

## Overview

The API testing suite provides comprehensive testing for employee creation, validation, and cleanup through OrangeHRM's REST API endpoints.

## Files Structure

- `add-employee.api.spec.ts` - Main API test file
- `../../../support/apiHelpers.ts` - Reusable API helper functions
- `../../../support/commands.ts` - Cypress custom commands
- `../../../support/types/index.d.ts` - TypeScript type definitions
- `../../../fixtures/users/employees.json` - Test data for employees

## Test Cases

### 1. Basic Employee Creation
- **Test**: `should create one or multiple employees via API`
- **Purpose**: Creates employees from fixture data and validates successful creation
- **Validations**:
  - Response status = 200
  - Employee data matches input
  - Employee number is generated
  - Login credentials are created

### 2. Data Structure Validation
- **Test**: `should validate employee creation with proper data structure`
- **Purpose**: Ensures API response has correct structure and required fields
- **Validations**:
  - Response contains `data`, `meta`, and `rels` properties
  - Employee data has all required fields
  - Field values match input data

### 3. Duplicate Handling
- **Test**: `should handle duplicate employee ID creation`
- **Purpose**: Tests system behavior when creating employees with duplicate IDs
- **Validations**:
  - System handles duplicate employee IDs appropriately
  - Either rejects duplicate or creates with different empNumber

## API Endpoints Used

### Authentication
- **POST** `/web/index.php/auth/validate`
- **Purpose**: Login and get authentication token
- **Body**: `{ username: 'Admin', password: 'admin123' }`

### Employee Creation
- **POST** `/web/index.php/api/v2/pim/employees`
- **Purpose**: Create new employee
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ firstName, middleName, lastName, employeeId }`

### User Credentials Creation
- **POST** `/web/index.php/api/v2/admin/users`
- **Purpose**: Create login credentials for employee
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ username, password, status: true, userRoleId: 2, empNumber }`

### Employee Deletion
- **DELETE** `/web/index.php/api/v2/pim/employees`
- **Purpose**: Delete employee (cleanup)
- **Headers**: `Authorization: Bearer {token}`
- **Body**: `{ ids: [empNumber] }`

## Test Data

The test uses employee data from `cypress/fixtures/users/employees.json`:

```json
[
  {
    "firstName": "John",
    "middleName": "A",
    "lastName": "Smith",
    "employeeId": "E1001",
    "username": "john.smith",
    "password": "StrongPass@123"
  },
  {
    "firstName": "Sara",
    "middleName": "B",
    "lastName": "Jones",
    "employeeId": "E1002",
    "username": "sara.jones",
    "password": "StrongPass@123"
  }
]
```

## Running the Tests

### Run All API Tests
```bash
npx cypress run --spec "cypress/e2e/specs/pim/add-employee.api.spec.ts"
```

### Run in Interactive Mode
```bash
npx cypress open
# Then select the add-employee.api.spec.ts file
```

### Run Specific Test
```bash
npx cypress run --spec "cypress/e2e/specs/pim/add-employee.api.spec.ts" --grep "should create one or multiple employees"
```

## Custom Commands Available

- `cy.apiLoginAdmin()` - Login as admin and get token
- `cy.createEmployeeViaAPI(employeeData, token)` - Create employee
- `cy.createEmployeeCredentials(empNumber, username, password, token)` - Create login credentials
- `cy.deleteEmployeeViaAPI(empNumber, token)` - Delete employee

## Helper Functions

- `loginAsAdmin()` - Returns authentication token
- `createEmployee(employeeData, token)` - Creates employee via API
- `createEmployeeLoginCredentials(empNumber, username, password, token)` - Creates login credentials
- `deleteEmployee(empNumber, token)` - Deletes employee
- `loginAsEmployee(username, password)` - Login as employee

## Cleanup

The test suite automatically cleans up created employees in the `after()` hook to prevent test data pollution. All created employee IDs are tracked and deleted after test completion.

## Environment Variables

- `Cypress.env('authToken')` - Stores authentication token
- `Cypress.env('createdEmployees')` - Stores created employee data for other tests

## Error Handling

The tests include proper error handling and validation:
- Authentication token validation
- Response status code checking
- Data structure validation
- Cleanup on test failure

## Best Practices

1. **Always cleanup**: Tests automatically delete created employees
2. **Use fixtures**: Employee data comes from JSON fixtures for maintainability
3. **Validate responses**: Comprehensive assertion on API responses
4. **Log important data**: Key information is logged for debugging
5. **Type safety**: TypeScript interfaces ensure type safety

## Troubleshooting

### Common Issues

1. **Authentication failures**: Ensure OrangeHRM is running and admin credentials are correct
2. **API endpoint errors**: Verify OrangeHRM API version and endpoint URLs
3. **Cleanup failures**: Check if employees were already deleted manually
4. **Type errors**: Ensure TypeScript types are properly imported

### Debug Tips

- Check Cypress logs for detailed API request/response information
- Use `cy.log()` statements to track test execution
- Verify fixture data format matches expected structure
- Check network tab in browser for API call details
