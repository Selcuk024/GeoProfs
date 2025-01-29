// cypress/e2e/adminPage.cy.js

describe('Admin Page User Info Modal Test', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.get('button').contains('Admin').click()

    cy.get('h1.title').should('contain', 'Admin Panel')
  })

  it('should open user information modal, wait for 4000ms, and close it', () => {
    cy.get('.add-user-button').contains('Informatie').first().click()

    cy.get('.modal').should('be.visible')

    cy.wait(4000)

    cy.get('.close-button').click()

    cy.get('.modal').should('not.exist')
  })
})
