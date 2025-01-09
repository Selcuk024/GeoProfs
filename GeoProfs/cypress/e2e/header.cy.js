// cypress/e2e/header.cy.js

describe('Header Component', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the logout button when hovering over the profile icon', () => {
    cy.get('.dropdown-content').should('not.be.visible')

    cy.get('.profile-icon').realHover()

    cy.get('.dropdown-content').should('be.visible')
  })

  it('should log out the user when the logout button is clicked', () => {
    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('consoleLog')
    })

    cy.get('.profile-icon').realHover()

    cy.get('.dropdown-content').click()

    cy.get('@consoleLog').should('be.calledWith', 'User logged out successfully')
  })
})
