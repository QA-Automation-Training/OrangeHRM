class ClaimPageAdmin {
    elements = {
        EmployeeNameInput: () =>
            cy
                .get('label')
                .contains('Employee Name')
                .closest('oxd-input-group')
                .find('input'),

        statusDropdown: () =>
            cy.get('label').contains('Status')
                .closest('.oxd-input-group')
                .find('.oxd-select-wrapper'),

        statusDropdownOptions: () =>
            cy.get('.oxd-select-dropdown [role="option"]'),

        searchButton: () =>
            cy.get('.oxd-form-actions').find('button[type="submit"]'),

        VeiweDetailesButton: () =>
            cy
                .get('button.oxd-button--text')
                .contains('View Details'),



    };

    navigateToPendingClaims(): this {
        cy.visit('/web/index.php/claim/viewAssignClaim');
        cy.wait(2000);
        cy.url().should('include', '/claim/pendingClaims');
        return this;
    }

    filterByEmployee(name: string): this {
        this.elements.EmployeeNameInput().type(name);
        return this;
    }

    filterByStatus(status: string): this {
        this.elements.statusDropdown().click();
        this.elements.statusDropdownOptions().contains(status).click();
        return this;

    }

    clickSearch(): this {
        this.elements.searchButton().click();
        cy.wait(2000);
        return this;
    }

    clickVeiweDetailesButton(): this {
        this.elements.VeiweDetailesButton().click();
        return this;
    }



    openClaimDetailsForEmployee(name: string, status: string): this {
        this.filterByEmployee(name)
            .filterByStatus(status)
            .clickSearch();

        // Wait for the table to appear
        cy.get('.oxd-table-card').should('be.visible');

        // Add log for debugging assistance
        cy.log(`Opening claim details for employee: ${name}`);

        // Find the row containing the employee name and click View Details
        cy.contains('.oxd-table-cell', name)
            .should('be.visible')
            .closest('.oxd-table-card')
            .within(() => {
                cy.contains('button', 'View Details')
                    .should('be.visible')
                    .should('not.be.disabled')
                    .click();
                cy.wait(2000);
                cy.url().should('include', '/claim/submitClaim/id/');
                cy.contains('button', 'Approve')
                    .should('exist')
                    .should('be.visible')
                    .should('not.be.disabled')
                    .click();
            });
        return this;
    }



}

export default ClaimPageAdmin;