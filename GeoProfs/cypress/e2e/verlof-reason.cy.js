describe('Verlof Reason Input Tests', () => {
    beforeEach(() => {

        cy.visit('http://localhost:5173');
      cy.get('.add').click();
    });
  
    it('should allow entering a reason for the verlof request', () => {
      const reason = 'Ik heb een persoonlijke afspraak.';
  
      cy.get('textarea[placeholder="Reden"]').type(reason);
  
      cy.get('textarea[placeholder="Reden"]').should('have.value', reason);
    });
  
    it('should show an error if reason is not provided and form is submitted', () => {
      cy.get('.modal-default-button').click();
  
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('Vul alle velden in.');
      });
    });
  });
  