// https://github.com/cypress-io/cypress-documentation/issues/2565#issuecomment-758527210
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        visitLogin: typeof visitLogin;
        visitMyPage: typeof visitMyPage;
        visitSignUp: typeof visitSignUp;
        visitThreads: typeof visitThreads;
        visitContact: typeof visitContact;
        visitProjectsSearch: typeof visitProjectsSearch;
        visitTop: typeof visitMyPage;
    }
}
