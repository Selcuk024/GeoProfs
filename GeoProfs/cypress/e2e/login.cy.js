describe("Login Page Integration Test", () => {
    beforeEach(() => {
      // Zorg ervoor dat je de juiste URL gebruikt voor je applicatie
      cy.visit("http://localhost:8080");
    });
  
    it("moet succesvol inloggen met correcte inloggegevens", () => {
      // Voer geldige inloggegevens in
      cy.get("#username").type("admin");
      cy.get("#password").type("password123");
  
      // Klik op de login-knop
      cy.get("button").contains("Login").click();
  
      // Controleer of de gebruiker naar de homepage wordt doorgestuurd
      cy.contains("Welkom Marco").should("exist");
    });
  
    it("moet een foutmelding tonen bij onjuiste inloggegevens", () => {
      // Voer ongeldige inloggegevens in
      cy.get("#username").type("invalidUser");
      cy.get("#password").type("invalidPassword");
  
      // Klik op de login-knop
      cy.get("button").contains("Login").click();
  
      // Controleer of de foutmelding wordt weergegeven
      cy.contains("Invalid username or password.").should("exist");
    });
  });
  