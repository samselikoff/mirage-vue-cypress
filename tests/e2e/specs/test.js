it("shows a message if there are no movies", function() {
  cy.visit("/");

  cy.get("[data-testid=loading]").should("exist");

  cy.contains("No movies").should("be.visible");
});

it("works with 5 movies", function() {
  cy.mirage(server => {
    server.createList("movie", 5);
  });

  cy.visit("/");

  cy.get('[data-testid="movie"]').should("have.length", 5);
});

it("can delete a movie", function() {
  cy.mirage(server => {
    server.create("movie");
  });

  cy.visit("/");
  cy.contains("Delete 1").click();

  cy.contains("No movies").should("be.visible");
  cy.mirage(server => {
    expect(server.db.movies.length).to.be.empty;
  });
});
