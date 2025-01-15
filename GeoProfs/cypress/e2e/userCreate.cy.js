describe('Create User Test', () => {
    beforeEach(() => {
      // Navigeer naar de Admin Panel pagina
      cy.visit('http://localhost:5173/admin'); // Pas de URL aan indien nodig
    });
  
    it('should create a new user', () => {
      // Klik op de knop om het formulier te openen
      cy.contains('Admin').click()
      cy.contains('Gebruiker Aanmaken').click();
  
      // Vul het formulier in
      cy.get('input[placeholder="Enter username"]').type('TestUser');
      cy.get('input[placeholder="Enter BSN"]').type('123456789');
      cy.get('input[placeholder="Enter afdeling"]').type('IT Department');
      
      // Genereer een wachtwoord
      cy.contains('Genereer Wachtwoord').click();
  
      // Kies een positie
      cy.get('select').select('Manager');
  
      // Klik op de submit-knop
      cy.get('button[type="submit"]').click();
  
      // Controleer of de nieuwe gebruiker in de lijst verschijnt
      cy.contains('TestUser').should('be.visible');
      cy.contains('Aangemaakt:').should('be.visible');
    });
  });
  