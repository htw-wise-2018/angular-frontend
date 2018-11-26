/// <reference types="Cypress" />

describe('  page', () => {
  it('visit', () => {
    cy.visit('http://localhost:4200/');
  });

  it('render visible sidenav', () => {
    cy.get('.mat-drawer-inner-container > div').should('be.visible');
  });
});
