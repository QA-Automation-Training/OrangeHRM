class ClaimPage {
  elements = {
    eventDropdown: () =>
      cy.contains('label', 'Event')
        .closest('.oxd-input-group')
        .find('.oxd-select-wrapper'),

    eventDropdownInput: () =>
      cy.contains('label', 'Event')
        .closest('.oxd-input-group')
        .find('.oxd-select-text-input'),

    currencyDropdown: () =>
      cy.contains('label', 'Currency')
        .closest('.oxd-input-group')
        .find('.oxd-select-wrapper'),

    currencyDropdownInput: () =>
      cy.contains('label', 'Currency')
        .closest('.oxd-input-group')
        .find('.oxd-select-text-input'),

    remarksTextarea: () => cy.get('.oxd-textarea'),

    submitButton: () => cy.get('button[type="submit"].oxd-button--secondary'),

    eventOptions: () => cy.get('.oxd-select-dropdown [role="option"]'),
    currencyOptions: () => cy.get('.oxd-select-dropdown [role="option"]'),
  };

  navigateToCreateClaim(): this {
    cy.visit('/web/index.php/claim/submitClaim');
    cy.url().should('include', '/claim/submitClaim');
    cy.get('.orangehrm-main-title').should('be.visible');
    return this;
  }

  selectEvent(eventName: string): this {
    this.elements.eventDropdown().click();
    
    cy.get('.oxd-select-dropdown', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains('[role="option"]', eventName, { timeout: 10000 }).click({ force: true });
      });

    return this;
  }

  selectCurrency(currencyName: string): this {
    this.elements.currencyDropdown().click();
    
    cy.get('.oxd-select-dropdown', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains('[role="option"]', currencyName, { timeout: 10000 }).click({ force: true });
      });

    return this;
  }

  enterRemarks(remarks: string): this {
    this.elements.remarksTextarea().clear().type(remarks);
    return this;
  }

  clickSubmit(): this {
    this.elements.submitButton().click();
    return this;
  }

  ensureAllDataExists(): this {
    cy.readFile('cypress/fixtures/claim/event-options.json', { log: false })
      .then((events) => {
        if (!events || !events.events?.length) {
          const defaultEvents = ["Travel Expense", "Medical Reimbursement", "Accommodation", "Meal Allowance", "Transportation"];
          cy.writeFile('cypress/fixtures/claim/event-options.json', { events: defaultEvents });
        }
      });

    cy.readFile('cypress/fixtures/claim/currency-options.json', { log: false })
      .then((currencies) => {
        if (!currencies || !currencies.currencies?.length) {
          const defaultCurrencies = ["United States Dollar (USD)", "Euro (EUR)", "British Pound (GBP)", "Japanese Yen (JPY)"];
          cy.writeFile('cypress/fixtures/claim/currency-options.json', { currencies: defaultCurrencies });
        }
      });

    return this;
  }
}

export default ClaimPage;