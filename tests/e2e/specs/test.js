import { Server, Model } from "@miragejs/server"
let server
beforeEach(() => {
  server = new Server({
    models: {
      movie: Model,
    },
    routes() {
      this.namespace = "api"
      this.resource("movie")
    },
  })
})
afterEach(() => {
  server.shutdown()
})
it("shows the movies", function() {
  server.createList("movie", 10)
  cy.visit("/")
  cy.get("li.movie").should("have.length", 10)
})