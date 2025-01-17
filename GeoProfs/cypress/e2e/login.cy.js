describe("Login Page Integration Test", () => {
    beforeEach(() => {
      // Zorg ervoor dat je de juiste URL gebruikt voor je applicatie
      cy.visit("http://localhost:5173/");
    });
  
    it("moet succesvol inloggen met correcte inloggegevens", () => {
      // Voer geldige inloggegevens in
      cy.get("#email").type("marco@gmail.com");
      cy.get("#password").type("adminn");
  
      // Klik op de login-knop
      cy.get("#submit").click();
  
      // Controleer of de gebruiker naar de homepage wordt doorgestuurd
      cy.contains("Welkom Marco").should("exist");
    });
  });
  