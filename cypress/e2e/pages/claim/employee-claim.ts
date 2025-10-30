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
  };

  navigateToCreateClaim(): this {
    cy.visit('/web/index.php/claim/submitClaim');
    cy.url().should('include', '/claim/submitClaim');
    return this;
  }

  selectEvent(eventName: string): this {
    // Click the dropdown to open it
    this.elements.eventDropdown().click();

    // Select the matching event option
    cy.get(".oxd-select-dropdown")
      .contains(eventName)
      .click();
    return this;
  }

  selectCurrency(currencyName: string): this {
    // Click the dropdown to open it
    this.elements.currencyDropdown().click();

    // Direct approach - find the option and click it
    cy.get('.oxd-select-dropdown [role="option"]')
      .should('be.visible')
      .contains(currencyName)
      .click({ force: true });

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

  addExpense(expenseType: string): this {
    this.clickAdd();
    this.selectExpenseType(expenseType);
    this.selectDate("2027-12-07");
    this.enterAmount("1000");
    this.clickSave();
    return this;
  }

  clickAdd(): this {
    cy.get("button").contains("Add").eq(0).click();
    return this;
  }

  selectExpenseType(expenseType: string): this {
    cy.contains("label", "Expense Type")
      .parents(".oxd-input-group")
      .find(".oxd-select-text")
      .click();
    cy.get(".oxd-select-dropdown")
      .contains(expenseType)
      .click();
    return this;
  }

  selectDate(date: string): this {
    cy.get("input[placeholder='yyyy-dd-mm']")
      .eq(0)
      .should('be.visible')
      .clear()
      .type(date);
    cy.get(".--close").should('be.visible').click();
    return this;
  }

  enterAmount(amount: string): this {
    cy.contains("label", "Amount")
      .parents(".oxd-input-group")
      .find("input")
      .clear()
      .type(amount);
    return this;
  }

  clickSave(): this {
    cy.get(`button[type='submit']`).eq(0).contains("Save").click();
    return this;
  }
}

export default ClaimPage;