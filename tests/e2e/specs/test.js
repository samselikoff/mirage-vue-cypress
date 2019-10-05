import { makeServer } from '../../../src/server'

Cypress.on('window:before:load', (win) => {
  win.XMLHttpRequest = window.XMLHttpRequest
})

let server

beforeEach(() => {
  server = makeServer('test')
})

afterEach(() => {
  server.shutdown()
})

it("shows the movies", function() {
  server.createList("movie", 10);

  cy.visit("/");
  cy.get("li.movie").should("have.length", 10);
});

it("can delete a movie", function() {
  server.createList("movie", 3);

  cy.visit("/");
  cy.contains('Delete 2').click()

  cy.get("li.movie").should("have.length", 2);
});
