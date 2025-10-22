// API Helper functions for OrangeHRM testing

export interface EmployeeData {
  firstName: string;
  middleName?: string;
  lastName: string;
  employeeId: string;
  username: string;
  password: string;
}

export interface ApiResponse {
  status: number;
  body: {
    data?: any;
    message?: string;
    status?: string;
    statusMessage?: string;
    statusCode?: number;
    timestamp?: string;
    path?: string;
    method?: string;
    query?: any;
    headers?: any;
  };
}

export interface LoginResponse {
  status: number;
  body: {
    data: {
      token: string;
      message: string;
      status: string;
      statusMessage: string;
      statusCode: number;
      timestamp: string;
      path: string;
      method: string;
      query: any;
      headers: any;
    };
  };
}

export interface EmployeeCreationResponse {
  status: number;
  body: {
    data: {
      empNumber: string;
      lastName: string;
      firstName: string;
      middleName: string;
      employeeId: string;
      terminationId: string;
    };
    meta: any[];
    rels: any[];
  };
}

/**
 * Get CSRF token from login page
 */
export function getCSRFToken(): Cypress.Chainable<string> {
  return cy.request({
    method: 'GET',
    url: '/web/index.php/auth/login'
  }).then((response) => {
    // Extract CSRF token from HTML response
    const html = response.body;
    
    // Try multiple patterns to find the CSRF token
    let tokenMatch = html.match(/token=""([^"]+)""/); // Escaped quotes pattern
    if (!tokenMatch) {
      tokenMatch = html.match(/token="([^"]+)"/); // Regular quotes pattern
    }
    if (!tokenMatch) {
      tokenMatch = html.match(/token=""([^"]+)""/); // Double escaped quotes
    }
    if (!tokenMatch) {
      tokenMatch = html.match(/token='([^']+)'/); // Single quotes pattern
    }
    if (!tokenMatch) {
      // Look for the token in Vue.js component props
      tokenMatch = html.match(/:token="([^"]+)"/); // Vue prop pattern
    }
    if (!tokenMatch) {
      // Look for any token-like string in the HTML
      tokenMatch = html.match(/([A-Za-z0-9]+\.[A-Za-z0-9]+\.[A-Za-z0-9]+)/);
    }
    
    if (tokenMatch) {
      return tokenMatch[1];
    }
    
    throw new Error('CSRF token not found in login page');
  });
}

/**
 * Login as admin with CSRF token
 */
export function loginAsAdmin(csrfToken: string): Cypress.Chainable<any> {
  return cy.request({
    method: 'POST',
    url: '/web/index.php/auth/validate',
    form: true,
    body: {
      username: 'Admin',
      password: 'admin123',
      _token: csrfToken
    }
  });
}

/**
 * Create a new employee via API
 */
export function createEmployee(employeeData: EmployeeData): Cypress.Chainable<EmployeeCreationResponse> {
  return cy.request({
    method: 'POST',
    url: '/web/index.php/api/v2/pim/employees',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      firstName: employeeData.firstName,
      middleName: employeeData.middleName || '',
      lastName: employeeData.lastName,
      employeeId: employeeData.employeeId
    }
  });
}

/**
 * Create login credentials for an employee
 */
export function createEmployeeLoginCredentials(empNumber: string, username: string, password: string): Cypress.Chainable<any> {
  return cy.request({
    method: 'POST',
    url: `/web/index.php/api/v2/admin/users`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      username: username,
      password: password,
      status: true,
      userRoleId: 2, // Employee role
      empNumber: empNumber
    }
  });
}

/**
 * Delete an employee by empNumber
 */
export function deleteEmployee(empNumber: string): Cypress.Chainable<any> {
  return cy.request({
    method: 'DELETE',
    url: `/web/index.php/api/v2/pim/employees`,
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      ids: [empNumber]
    }
  });
}

/**
 * Login as employee with username and password
 */
export function loginAsEmployee(username: string, password: string): Cypress.Chainable<LoginResponse> {
  return cy.request({
    method: 'POST',
    url: '/web/index.php/auth/validate',
    form: true,
    body: {
      username: username,
      password: password
    }
  });
}
