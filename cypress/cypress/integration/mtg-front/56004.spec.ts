// @ts-ignore
describe('Tests for /projects/show/{projectId}, /projects/application/{projectId}', () => {

    it('check if data exists projects/show/', () => {
        //--login
        cy.visitLogin();
        cy.get('input[name=email').type('user@example.com')
        cy.get('input[name=password]').type('password')
        cy.get('#login-btn1').click();
        cy.url().should('include', 'home')

        //--id;s to check
        const ids = [1, 2]

        ids.map(id => {
            //--visit url
            cy.visit('projects/show/' + id)
            cy.url().should('eq', Cypress.config().baseUrl! + 'projects/show/' + id)

            //--check if orderer is link to its profile
            cy.get('[data-cy=profilebtn]').should('have.attr', 'href')
                .and('not.include', 'undefined')
                .then((href) => {
                    const url = href.slice(1, href.length)
                    cy.get('[data-cy=profilebtn]').click()
                    cy.url().should('eq', Cypress.config().baseUrl! + url)
                }).go('back');

            //--check if the page have loaded the necessary data
            cy.get('[data-cy=profilebtn]')
                .should('have.attr', 'href')
                .and('not.include', 'undefined')

            //--check if heart toggle is good
            cy.get('[data-cy=heartToggle]').click()
            cy.get('[data-cy=heartToggle]').should('have.attr', 'class')
                .and('include', 'one')
            cy.get('[data-cy=heartToggle]').click()
            cy.get('[data-cy=heartToggle]').should('have.attr', 'class')
                .and('not.include', 'one')

            //check if link to projects/applications/xx shows with condition
            if (id === 1) {
                cy.get('[data-cy=linkToProjApplication]').should('not.exist');
            } else {
                cy.get('[data-cy=linkToProjApplication]').should('exist')
            }
        })
    })

    it('check if data exists projects/applications/xx and save', () => {
        //--login
        cy.visitLogin();
        cy.get('input[name=email').type('user@example.com')
        cy.get('input[name=password]').type('password')
        cy.get('#login-btn1').click();
        cy.url().should('include', 'home')

        //--visit
        const url = 'projects/show/2'
        cy.visit(url)
        cy.get('[data-cy=profilebtn]').should('have.attr', 'href')
            .and('not.include', 'undefined');
        cy.get('[data-cy=linkToProjApplication]').should('be.visible')
        cy.get('[data-cy=linkToProjApplication]').click()

        //--establish data to be save
        cy.get('[data-cy=contractorPrice]').clear().type('777')
        cy.get('[data-cy=immediateReceivingFlag]').check().should('be.checked')
        cy.get('[data-cy=negotiationFlag]').check().should('be.checked')
        cy.get('[data-cy=questionFlag]').check().should('be.checked')
        cy.get('[data-cy=contractorComment]').clear().type('#i dont #wanna give #you #up')

        //--save
        cy.get('[data-cy=submit]').click()
        cy.get('[data-cy=p-send]').click()

        //--check save data if it's a match
        cy.get('[data-cy=submit]').should('be.visible')
        cy.get('[data-cy=contractorPrice]').should('have.value', '777')
        cy.get('[data-cy=immediateReceivingFlag]').should('be.checked')
        cy.get('[data-cy=negotiationFlag]').should('be.checked')
        cy.get('[data-cy=questionFlag]').should('be.checked')
        cy.get('[data-cy=contractorComment]').should('have.value', '#i dont #wanna give #you #up')

        //--check top back button if working
        cy.get('[data-cy=backTop]').click().then(() => {
            cy.url().should('eq', Cypress.config().baseUrl! + url)
        })

        cy.get('[data-cy=profilebtn]').should('have.attr', 'href')
            .and('not.include', 'undefined');
        cy.get('[data-cy=linkToProjApplication]').should('be.visible')
        cy.get('[data-cy=linkToProjApplication]').click()

        //--check bottom back button if working
        cy.get('[data-cy=backBottom]').click().then(() => {
            cy.url().should('eq', Cypress.config().baseUrl! + url)
        })
    })
});