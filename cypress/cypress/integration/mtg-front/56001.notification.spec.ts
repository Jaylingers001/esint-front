import {waitTime} from '../../support/constant';

describe('notification test', () => {

    it('notifications for login user@example.com', () => {
        cy.visitLogin();
        cy.get('#login-btn2').click();
        cy.visitLogin();
        cy.get('input[type=email]').type('user@example.com')
        cy.get('input[type=password]').type('password')
        cy.get('#login-btn1').click();
        cy.url().should('include', 'home')
        cy.visit('/');
        cy.get('#bell').click();
        cy.contains('運営からお知らせ').should('be.visible')
        cy.get('#news-list').then(data => {
            console.log(data.children().length);
            expect(data.children().length).to.equal(5)
        })
    })
    it('notifications for login aiueo@abc.com', () => {
        cy.visitLogin();
        cy.get('#login-btn2').click();
        cy.visitLogin();
        cy.get('input[type=email]').type('aiueo@abc.com')
        cy.get('input[type=password]').type('password')
        cy.get('#login-btn1').click();
        cy.url().should('include', 'home')
        cy.visit('/');
        cy.get('#bell').click();
        cy.contains('運営からお知らせ').should('be.visible')
        cy.get('#news-list').then(data => {
            console.log(data.children().length);
            expect(data.children().length).to.equal(2)
        })
    })
    it('notifications for no user login', () => {
        cy.visitLogin();
        cy.get('#login-btn2').click();
        cy.get('#bell').click();
        cy.contains('運営からお知らせ').should('be.visible')
        cy.get('#news-list').then(data => {
            console.log(data.children().length);
            expect(data.children().length).to.equal(1)
        })
    })
})