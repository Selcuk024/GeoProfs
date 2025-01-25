describe('Verlof Invalid Date Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
    cy.get('.add').click()
  })

  it('should show an error alert when the start date is after the end date', () => {
    cy.get('textarea[placeholder="Reden"]').type('TEST VERLOF SUBMTI')

    cy.get('input[type="date"]').first().type('2025-01-22')
    cy.get('input[type="date"]').last().type('2025-01-19')

    cy.get('.modal-default-button').click()

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('De einddatum mag niet eerder zijn dan de startdatum.')
    })
  })
})