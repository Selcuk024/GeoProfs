describe('Verlof Type Selection Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173'); 
      
      cy.get('.add').should('be.visible').click();
    });
  
    it('should select "Persoonlijk" verlof type', () => {
      cy.get('input[type="radio"][value="Persoonlijk"]').check();
      cy.get('input[type="radio"][value="Persoonlijk"]').should('be.checked');
    });
  
    it('should select "Vakantie" verlof type', () => {
      cy.get('input[type="radio"][value="Vakantie"]').check();
      cy.get('input[type="radio"][value="Vakantie"]').should('be.checked');
    });
  
    it('should select "Ziek" verlof type', () => {
      cy.get('input[type="radio"][value="Ziek"]').check();
      cy.get('input[type="radio"][value="Ziek"]').should('be.checked');
    });
  
    it('should select "Overige" verlof type', () => {
      cy.get('input[type="radio"][value="Overige"]').check();
      cy.get('input[type="radio"][value="Overige"]').should('be.checked');
    });
  });
  