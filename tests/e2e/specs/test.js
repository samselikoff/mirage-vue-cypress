import { makeServer } from "../../../src/server";

let server;

beforeEach(() => {
  server = makeServer({ environment: "test" });
});

afterEach(() => {
  server.shutdown();
});

Cypress.on("window:before:load", win => {
  win.handleFromCypress = function(request) {
    console.log(request.method);

    return fetch(request.url, { method: request.method }).then(res => {
      if (res.headers.map["content-type"] === "application/json") {
        return res.json();
      } else {
        return "";
      }
    });
  };
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

it("can delete a movie", function() {
  server.create("movie");

  cy.visit("/");
  cy.contains("Delete 1").click();

  cy.contains("No movies").should("be.visible");

  cy.should(() => {
    expect(server.db.movies).to.be.to.empty;
  });
});
