class ClaimPageAdmin {
    elements = {
        EmployeeNameInput: () =>
            cy.contains('label', 'Employee Name')
                .closest('.oxd-input-group')
                .find('input[placeholder="Type for hints..."]'),

        statusDropdown: () =>
            cy.contains('label', 'Status')
                .closest('.oxd-input-group')
                .find('.oxd-select-wrapper'),
        statusDropdownOptions: () =>
            cy.get('.oxd-select-dropdown [role="option"]'),
        searchButton: () =>
            cy.get('.oxd-form-actions').find('button[type="submit"]'),
        viewDetailsButton: () =>
            cy.get('button.oxd-button--text').contains('View Details'),
        approveButton: () =>
            cy.contains('button', 'Approve'),
    };

    navigateToViewAssignClaim(): this {
        cy.visit('/web/index.php/claim/viewAssignClaim');
        cy.url().should('include', '/claim/viewAssignClaim');
        return this;
    }

    filterByEmployee(name: string): this {
        this.elements.EmployeeNameInput()
            .clear()
            .type(name, { delay: 100 });
        return this;
    }

    filterByStatus(status: string): this {
        this.elements.statusDropdown().click();
        this.elements.statusDropdownOptions().contains(status).click();
        return this;
    }

    clickSearch(): this {
        this.elements.searchButton().click();
        cy.get('.oxd-table-card', { timeout: 10000 }).should('be.visible');
        return this;
    }

    clickViewDetailsButton(): this {
        this.elements.viewDetailsButton().click();
        cy.url().should('include', '/claim/submitClaim/id/');
        return this;
    }

    clickApproveButton(): this {
        this.elements.approveButton()
            .should('be.visible')
            .should('not.be.disabled')
            .click();

        cy.get('.oxd-toast', { timeout: 10000 }).should('be.visible');
        return this;
    }

    openClaimDetailsForEmployee(fullName: string, status: string = 'Submitted'): this {
        this.filterByEmployee(fullName)
            .filterByStatus(status)
            .clickSearch();

        cy.get('.oxd-table-card', { timeout: 20000 }).should('be.visible');

        cy.get('.oxd-table-card').then(($rows) => {
            const rowCount = $rows.length;
            
            for (let i = 0; i < 3; i++) {
                cy.get('.oxd-table-card').eq(i)
                    .find('button.oxd-button--text')
                    .contains('View Details')
                    .click();                
                cy.contains('button', 'Approve')
                    .should('be.visible')
                    .click();

                cy.get('.oxd-toast', { timeout: 10000 }).should('be.visible');
                
                this.navigateToViewAssignClaim();
                
                if (i < rowCount - 1) {
                    this.filterByEmployee(fullName)
                        .filterByStatus(status)
                        .clickSearch();
                }
            }
        });

        return this;
    }
}

export default ClaimPageAdmin;