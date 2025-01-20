describe('Verlof Type Selection Tests', () => {
    beforeEach(() => {
      // Visit the app
      cy.visit('http://localhost:5173'); 
      
      // Ensure the "+" button is visible and click it to open the modal
      cy.get('.add').should('be.visible').click();
    });
  
    it('should select "Persoonlijk" verlof type', () => {
      // Select the "Persoonlijk" radio button
      cy.get('input[type="radio"][value="Persoonlijk"]').check();
      // Verify the "Persoonlijk" radio button is selected
      cy.get('input[type="radio"][value="Persoonlijk"]').should('be.checked');
    });
  
    it('should select "Vakantie" verlof type', () => {
      // Select the "Vakantie" radio button
      cy.get('input[type="radio"][value="Vakantie"]').check();
      // Verify the "Vakantie" radio button is selected
      cy.get('input[type="radio"][value="Vakantie"]').should('be.checked');
    });
  
    it('should select "Ziek" verlof type', () => {
      // Select the "Ziek" radio button
      cy.get('input[type="radio"][value="Ziek"]').check();
      // Verify the "Ziek" radio button is selected
      cy.get('input[type="radio"][value="Ziek"]').should('be.checked');
    });
  
    it('should select "Overige" verlof type', () => {
      // Select the "Overige" radio button
      cy.get('input[type="radio"][value="Overige"]').check();
      // Verify the "Overige" radio button is selected
      cy.get('input[type="radio"][value="Overige"]').should('be.checked');
    });
  });
  