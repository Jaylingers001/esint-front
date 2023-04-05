// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

export const visitLogin = () => {
    cy.visit("/login");
    cy.get('input[name=email').type('user@example.com')
    cy.get('input[name=password]').type('password')
    cy.get('a input').get(`[value="ログイン"]`).click()
}

export const visitMyPage = () => {
    cy.visit("/myPage");
}

export const visitSignUp = () => {
    cy.visit("/signup");
}

export const visitThreads = () => {
    cy.visit("/mypage/threads");
}
export const visitContact = () => {
    cy.visit("/contact");
}

export const visitProjectsSearch = () => {
    cy.visit("/projects/search");
}

export const visitTop = () => {
    cy.visit("/");
}

Cypress.Commands.add('visitLogin', visitLogin);
Cypress.Commands.add('visitMyPage', visitMyPage);
Cypress.Commands.add('visitSignUp', visitSignUp);
Cypress.Commands.add('visitThreads', visitThreads);
Cypress.Commands.add('visitContact', visitContact);
Cypress.Commands.add('visitProjectsSearch', visitProjectsSearch);
Cypress.Commands.add('visitTop', visitTop);

