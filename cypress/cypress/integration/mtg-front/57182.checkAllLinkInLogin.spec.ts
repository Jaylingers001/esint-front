import {loginLinks} from '../../support/constant';

describe('Tests for Login', () => {
    it('All links must be exists', () => {
        loginLinks.map((link) => {
            cy.visitLogin();
            cy.get('input[name=email').type('user@example.com')
            cy.get('input[name=password]').type('password')
            cy.get('a input').get(`[title="${link}"]`).click()
            cy.url().should('eq', Cypress.config().baseUrl + link);
            cy.go('back')

            cy.get('input[name=email').clear().type('123user@example.com')
            cy.get('input[name=password]').type('password')
            cy.get('a input').get(`[title="${link}"]`).click()
            cy.get(`label[title=error]`).should('have.text','メールアドレスもしくはパスワードが異なります')
        })
    })
});
