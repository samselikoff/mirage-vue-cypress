import { makeServer } from "../../../src/server";

let server;

beforeEach(() => {
  server = makeServer({ environment: "test" });
});

afterEach(() => {
  server.shutdown();
});

it("shows a message if there are no movies", function() {
  cy.visit("/");

  cy.get("[data-testid=loading]").should("exist");

  cy.contains("No movies").should("be.visible");
});

it("works with 5 movies", function() {
  server.createList("movie", 5);

  cy.visit("/");

  cy.get('[data-testid="movie"]').should("have.length", 5);
});

it("can add a movie", function() {
  cy.visit("/");
  cy.get("[data-testid=add-movie]").type("New movie{enter}");

  cy.get('[data-testid="movie"]').should("have.length", 1);

  cy.should(() => {
    expect(server.db.movies).to.have.lengthOf(1);
    expect(server.db.movies[0].title).to.eq("New movie");
  });
});

it("edit a movie", function() {
  server.create("movie", { title: "Old title" });

  cy.visit("/");
  cy.get("[data-testid=edit-movie]")
    .clear()
    .type("New title{enter}");

  cy.get("[data-testid='edit-movie']").should("have.value", "New title");

  cy.should(() => {
    expect(server.db.movies[0].title).to.eq("New title");
  });
});

it("can delete a movie", function() {
  server.create("movie");

  cy.visit("/");
  cy.contains("Delete 1").click();

  cy.contains("No movies").should("be.visible");

  cy.should(() => {
    expect(server.db.movies).to.be.to.empty;
  });
});

it("can visit a movie detail", function() {
  let movie = server.create("movie", { title: "Star Wars" });

  cy.visit(`/movies/${movie.id}`);

  cy.contains("Details for Star Wars").should("be.visible");
});
