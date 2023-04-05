import {myPageLinks} from '../../support/constant';

describe('Tests for Mypage', () => {

    it('All links must be exists', () => {
        myPageLinks.map((link) => {
            cy.visitMyPage();
            cy.get('a').get(`[href="/${link}"]`).click()
            cy.url().should('eq', Cypress.config().baseUrl + link);
        })
    })
});
