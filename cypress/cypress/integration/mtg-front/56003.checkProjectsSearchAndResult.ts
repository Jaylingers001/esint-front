import {waitTime} from '../../support/constant';

describe('Tests for Projects Search & Projects Id', () => {

    it('Test /projects/search & /projects/result', () => {
        cy.visitProjectsSearch();
        cy.wait(waitTime);
        cy.url().should('eq', Cypress.config().baseUrl + 'projects/search');
        cy.get('input[name=keyword]').type('a',{force:true})
        cy.get('input[name=stockFrom]').type('1')
        cy.get('input[name=workDateFrom]').type('2022-01-01T14:38')
        cy.get('input[name=workDateTo]').type('2022-05-27T14:38')
        cy.get('input[name=restraintDateFrom]').type('2022-01-01T14:38')
        cy.get('input[name=restraintDateTo]').type('2022-05-27T14:38')
        cy.get('select[name=areaId]').select('北海道')
        cy.get('input[name=priceFrom]').type('0')
        cy.get('input[name=priceTo]').type('5')
        cy.contains('音響').click()
        cy.contains('この条件で検索する').click({force:true})

        cy.contains('検索結果').should('be.visible');
        cy.url().should('eq', Cypress.config().baseUrl + 'projects/result');
        cy.contains('並び替え').click()
        cy.wait(waitTime);
        cy.contains('並び替え').click()
        cy.wait(waitTime);

        for(let i=0; i <= 3; i++) {
            cy.get('#top-list')
                .find('li')
                .then(listing => {
                    const listingCount = Cypress.$(listing).length;
                    cy.get('span[id=totalSearch]').should('have.text',listingCount)
                    if(i === 2) {
                        cy.get('input[name=search]').type('aa');
                    }
                    if(i === 3) {
                        cy.wait(waitTime);
                        cy.contains('再検索').click()
                        cy.url().should('eq', Cypress.config().baseUrl + 'projects/search');
                        cy.get('input[name=keyword]').should('have.value','a')
                        cy.get('input[name=stockFrom]').should('have.value','1')
                        cy.get('input[name=workDateFrom]').should('have.value','2022-01-01T14:38')
                        cy.get('input[name=workDateTo]').should('have.value','2022-05-27T14:38')
                        cy.get('input[name=restraintDateFrom]').should('have.value','2022-01-01T14:38')
                        cy.get('input[name=restraintDateTo]').should('have.value','2022-05-27T14:38')
                        cy.get('select[name=areaId]').should('have.value','1')
                        cy.get('input[name=priceFrom]').should('have.value','0')
                        cy.get('input[name=priceTo]').should('have.value','5')
                    }
                });
        }


    })
});
