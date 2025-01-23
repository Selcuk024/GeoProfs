describe('Verlof Missing Fields Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
    cy.get('.add').click()
  })

  it('should show an error alert when reason field is empty', () => {
    cy.get('input[type="radio"][value="Persoonlijk"]').check()

    cy.get('.modal-default-button').click()

    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Vul alle velden in.')
    })
  })
})
