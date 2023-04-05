import {waitTime} from '../../support/constant';

describe('threads test', () => {

    it('threads test for login user@example.com', () => {
        //login
        cy.visitLogin();
        cy.get('input[type=email]').type('user@example.com')
        cy.get('input[type=password]').type('password')
        cy.get('#login-btn1').click();
        cy.url().should('include', 'home')
        cy.visit('/');

        //mypage/threads
        cy.visitThreads();
        cy.url().should('include', 'mypage/threads')
        cy.contains('スレッド一覧').should('be.visible')

        //check if there's data
        cy.get('[data-cy=link-0]')
            .should('be.visible')

        //click data to proceed next page
        cy.get('[data-cy=link-0]')
            .click({force: true})
        cy.url().should('include', 'mypage/threads/show/')

        //check if there's data
        cy.get('[data-cy=message-0]')
            .should('be.visible')

        //send message
        const message = "Message to send to Database"
        cy.get('[data-cy=body]').type(message).should('have.value', message)
        cy.get('[data-cy=submit]').click();
        cy.get('[data-cy=contents]').should('contain',message)

        //reload click
        cy.get('[data-cy=reload]').click({force: true});
        cy.url().should('include', '/mypage/threads/show/')
        cy.get('[data-cy=title]').should('be.visible');
        cy.get('[data-cy=contents]').should('contain', message)

        //back button
        cy.get('[data-cy=back]').click({force: true});
        cy.url().should('eq', Cypress.config().baseUrl + 'mypage/threads')


    })

})