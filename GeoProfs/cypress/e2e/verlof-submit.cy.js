  describe('Verlof Modal Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173');
    });
  
    it('should submit a verlof request', () => {
      cy.get('.add').click();

      cy.get('[name="modal"]', { timeout: 5000 })
      .should('exist')
      .and('have.css', 'display', 'block');
  
      cy.get('input[type="radio"][value="Persoonlijk"]').check();
      cy.get('textarea[placeholder="Reden"]').type('Ik heb een persoonlijke afspraak.');
      cy.get('input[type="date"]').first().type('2024-12-12');
      cy.get('input[type="date"]').last().type('2024-12-13');
  
      cy.get('.modal-default-button').click();
  
      cy.get('[name="modal"]').should('not.exist');
  
      cy.get('.allItems .verlof-item', { timeout: 10000 }).should('contain', 'Ik heb een persoonlijke afspraak.');
      cy.get('.allItems .verlof-item').should('contain', '12-12-2024 - 13-12-2024');
    });
  });
  