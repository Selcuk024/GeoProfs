describe('Admin Panel - Gebruiker Aanmaken', () => {
  it('Moet een nieuwe gebruiker aanmaken via de Admin-sectie', () => {
    cy.visit('/'); 
    cy.contains('Admin').click();

    cy.contains('Admin Panel').should('be.visible');

    cy.contains('Gebruiker Aanmaken').click();

    cy.get('form.userForm').should('be.visible');

    cy.get('input[placeholder="Enter username"]').type('TestUser');
    cy.get('input[placeholder="Enter email"]').type('testuser@example.com');
    cy.get('input[placeholder="Enter BSN"]').type('123456789');
    cy.get('input[placeholder="Enter afdeling"]').type('IT');

    cy.contains('Genereer Wachtwoord').click();

    cy.get('select').select('Manager');

    cy.get('button.submitButton').click();

    cy.contains('TestUser').should('be.visible');
  });
});
