declare namespace Cypress {
    interface Chainable {
        /**
         * Logs in to OrangeHRM using the default admin credentials.
         */
        loginToOrangeHRM(): Chainable<void>;
        loginAsAdmin(): Chainable<any>;
        apiLogin(username: string, password: string): Chainable<any>;





    }
}
