import {waitTime} from '../../support/constant';

describe('/single test', () => {

    it('notifications for login user@example.com', () => {

        //--login
        cy.visitLogin();
        cy.get('input[type=email]').type('user@example.com')
        cy.get('input[type=password]').type('password')
        cy.get('#login-btn1').click();
        cy.url().should('include', 'home')
        cy.visit('/');

        //--click bell
        cy.get('#bell').click();
        cy.contains('運営からお知らせ').should('be.visible')

        //--click data
        cy.get('[data-cy=news-list]').contains('notif 3 title').click()
        cy.url().should('include', 'single')
        cy.get('[data-cy=title]').contains('notif 3 title')
            .should('be.visible')

        cy.get('[data-cy=date]').contains('2022/03/04')
            .should('be.visible');
    })
})