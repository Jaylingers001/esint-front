// @ts-ignore
//--constant message
const name = 'cyril'
const contactType = '使い方について'
const email = 'cyril@gmail.com'
const tel = '090-6969-6969'
const body = 'GOT the beat \'Step Back\' Dance Practice'

describe('Tests for /contact', () => {

    it('sending a message from form', () => {
        cy.visitContact();
        cy.url().should('include', '/contact')

        //--input form
        typeInForm();

        //--submit form with values
        cy.get('[data-cy=submit]').click();

        //--check if values submitted is correct
        cy.url().should('include', '/contact/confirm')
        cy.get('[data-cy=contactType]')
            .should('contain', contactType)
        cy.get('[data-cy=name]')
            .should('contain', name)
        cy.get('[data-cy=email]')
            .should('contain', email)
        cy.get('[data-cy=tel]')
            .should('contain', tel)
        cy.get('[data-cy=body]')
            .should('contain', body)

        //--check if back button works
        cy.get('[data-cy=back]').click({force: true})
        cy.url().should('include', '/contact')
        cy.get('[data-cy=contactType]')
            .should('have.value', contactType)
        cy.get('[data-cy=name]')
            .should('have.value', name)
        cy.get('[data-cy=email]')
            .should('have.value', email)
        cy.get('[data-cy=tel]')
            .should('have.value', tel)
        cy.get('[data-cy=body]')
            .should('have.value', body)

        //--clearForm
        cy.get('[data-cy=clear]').click({force: true})
        cy.get('[data-cy=contactType]').should('have.value', '')
        cy.get('[data-cy=name]').should('have.value', '')
        cy.get('[data-cy=email]').should('have.value', '')
        cy.get('[data-cy=tel]').should('have.value', '')
        cy.get('[data-cy=body]').should('have.value', '')

        //--send message
        typeInForm();
        cy.get('[data-cy=submit]').click();
        cy.url().should('include', '/contact/confirm')
        cy.get('[data-cy=send]').click()
        cy.url().should('include', '/contact/complete')

        //--check if home button works
        cy.get('[data-cy=home]').click();
        cy.url().should('not.include', '/contact')
    })
})

const typeInForm = () => {
    cy.get('[data-cy=contactType]').select('使い方について')
        .should('have.value', contactType)
    cy.get('[data-cy=name]').type('cyril')
        .should('have.value', name)
    cy.get('[data-cy=email]').type('cyril@gmail.com')
        .should('have.value', email)
    cy.get('[data-cy=tel]').type('090-6969-6969')
        .should('have.value', tel)
    cy.get('[data-cy=body]').type('GOT the beat \'Step Back\' Dance Practice')
        .should('have.value', body)
}