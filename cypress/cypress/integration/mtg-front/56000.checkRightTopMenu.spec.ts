import {rightTopMenu, waitTime, myPageAndOthersLink} from '../../support/constant';


describe('Tests for Right Index Menu', () => {

    it('login by user', () => {
        cy.visitLogin();
        rightTopMenu.map((link) => {
            if (link === 'openbtn1') {
                cy.wait(waitTime)
                cy.get('.openbtn1').click()
                cy.get('.t2').should('have.text', 'user@example.com')
                cy.get('a').get(`[href="/mypage/profile"]`).click()
                cy.url().should('eq', Cypress.config().baseUrl + 'mypage/profile');
                cy.go('back')
                myPageAndOthersLink.map((link) => {
                    cy.wait(waitTime)
                    cy.get('.openbtn1').click()
                    cy.get('a').get(`[href="/${link}"]`).click({force:true})
                    cy.url().should('eq', Cypress.config().baseUrl + link);
                    cy.visitTop();
                })
                cy.wait(waitTime)
                cy.get('.openbtn1').click()
                cy.contains('ログアウトはこちら').click({force:true})
            } else {
                cy.get('footer ul li a').get(`[href="/${link}"]`).eq(0).click()
                cy.url().should('eq', Cypress.config().baseUrl + link);
            }
        })
    })

    it('not login', () => {
        //check if the user is not logged in, move to /login page.
        rightTopMenu.map((link) => {
            if (link === 'openbtn1') {
                cy.visitTop();
                cy.wait(waitTime)
                cy.get('.openbtn1').click()
                cy.get('.t2').should('not.have.text', 'user@example.com')
                cy.contains('お仕事発注はこちら').click()
                cy.url().should('eq', Cypress.config().baseUrl + 'login');
            } else {
                cy.visit(link);
                cy.url().should('eq', Cypress.config().baseUrl + link);
                cy.wait(waitTime)
            }
        })
    })
});
