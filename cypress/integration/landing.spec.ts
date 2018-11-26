/// <reference types="Cypress" />

describe('landing page', () => {
  it('Should visit page', () => {
    cy.visit('http://localhost:4200/');
  });

  it('render root', () => {
    cy.get('app-root');
  });

  it('render leaflet map', () => {
    cy.get('.leaflet-pane');
  });

  it('render nav buttons', () => {
    cy.get('app-button-nav');
    cy.get('app-button-nav app-layer-button');
    cy.get('app-button-nav app-filter-button');
  });


  it('render visible leaflet contribution', () => {
    cy.get('.leaflet-control-attribution').should('be.visible');
  });

  it('render hidden sidenav', () => {
    cy.get('.mat-drawer-inner-container > div').should('be.hidden');
  });
});
