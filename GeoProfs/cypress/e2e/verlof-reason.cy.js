describe('Verlof Reason Input Tests', () => {
    beforeEach(() => {
      // Visit the app and open the modal
      cy.visit('http://localhost:5173');
      cy.get('.add').click(); // Open the modal
    });
  
    it('should allow entering a reason for the verlof request', () => {
      const reason = 'Ik heb een persoonlijke afspraak.';
  
      // Type the reason into the "Reden" textarea
      cy.get('textarea[placeholder="Reden"]').type(reason);
  
      // Verify that the entered text is correct
      cy.get('textarea[placeholder="Reden"]').should('have.value', reason);
    });
  
    it('should show an error if reason is not provided and form is submitted', () => {
      // Leave the reason field empty and attempt to submit
      cy.get('.modal-default-button').click();
  
      // Verify that the appropriate alert is shown
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Vul alle velden in.');
      });
    });
  });
  