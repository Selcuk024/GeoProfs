// cypress/e2e/nav-tabs.cy.js

describe('NavTabs Component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should highlight the active tab when clicked', () => {
    cy.contains('button', 'Verlof').click()
    cy.contains('button', 'Verlof').should('have.class', 'active')

    cy.contains('button', 'Afwezig').click()
    cy.contains('button', 'Afwezig').should('have.class', 'active')

    cy.contains('button', 'Verlof').should('not.have.class', 'active')
  })
})
