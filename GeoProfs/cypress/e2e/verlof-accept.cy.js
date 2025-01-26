describe('Admin Panel - Verlof Goedkeuren', () => {
    beforeEach(() => {
        // Ga naar de homepagina en navigeer naar het admin panel
        cy.visit('/'); 
        cy.get('button').contains('Admin').click();
        cy.get('h1.title').should('contain', 'Admin Panel');
    });

    it('Keurt een verlof goed en verifieert de wijzigingen op de verlofpagina', () => {
        // Controleer of er een verlofaanvraag aanwezig is in het Admin Panel
        cy.get('.big-container .user-container')
            .contains('Reden:')
            .should('exist');

        // Haal de eerste verlof aanvraag op om de details te verifiëren
        cy.get('.big-container .user-container').first().then(($verlof) => {
            const reason = $verlof.find('.verlof-reden').first().text().replace('Reden: ', '').trim();
            const startDate = $verlof.find('.verlof-datum').eq(1).text().replace('Van: ', '').trim();
            const endDate = $verlof.find('.verlof-datum').eq(2).text().replace('Tot: ', '').trim();

            // Klik op de "Goedkeuren" knop
            cy.get('.big-container .approve').first().click();

            // Controleer dat de verlofaanvraag verdwijnt uit de Admin Panel
            cy.get('.big-container .user-container')
                .contains('Reden:')
                .should('not.exist');

            // Navigeer naar de verlofpagina
            cy.get('button').contains('Verlof').click();

            // Klik op de "Goedgekeurd" tab om goedgekeurde verlofaanvragen te bekijken
            cy.contains('Goedgekeurd').click();

            // Controleer of de goedgekeurde verlofaanvraag verschijnt in de "Goedgekeurd" sectie met de juiste reden en datums
            cy.get('.verlof-item').contains(`Reden: ${reason}`).should('exist');
            cy.get('.verlof-item').contains(`Van: ${startDate}`).should('exist');
            cy.get('.verlof-item').contains(`Tot: ${endDate}`).should('exist');
            cy.get('.verlof-item').contains('Status: Goedgekeurd').should('exist');
        });
    });
});
