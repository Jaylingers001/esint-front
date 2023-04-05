import {loginLinks} from '../../support/constant';

describe('Tests for signUp', () => {

    it('test /signup, /tel, /telAuthentication, /complete, /emailAuthentication', () => {
        cy.visitSignUp();
        cy.url().should('eq', Cypress.config().baseUrl + 'signup');
        cy.get('input[name=email').type('jomarie@ajio.co.jp')
        cy.get('input[name=name').type('Jomarie Jay Batingal')
        cy.get('input[name=postalCode1').type('123')
        cy.get('input[name=postalCode2').type('1234')
        cy.get('select[name=areaId').select('北海道')
        cy.get('input[name=address1').type('address1')
        cy.get('input[name=address2').type('address2')
        cy.get('input[name=experienceYears').type('1')
        cy.get('input[name=experienceYears').type('1')
        cy.get('textarea[name=selfIntroduction').type('selfIntroduction')
        cy.get('input[name=password').type('1234')
        cy.get('input[name=passwordVerification').type('1234')
        cy.contains('会員登録する').click({force: true})

        cy.get('input[name=tel').type('01023457080')
        cy.url().should('eq', Cypress.config().baseUrl + 'signup/tel');
        cy.contains('次へ').click({force: true})

        cy.get('input[name=authenticationCode').type('111111')
        cy.url().should('eq', Cypress.config().baseUrl + 'signup/telAuthentication');
        cy.contains('認証する').click({force: true})

        cy.url().should('eq', Cypress.config().baseUrl + 'signup/complete');
    })
});
