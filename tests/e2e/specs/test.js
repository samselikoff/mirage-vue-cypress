import { Server, Model } from "@miragejs/server";

it("shows the movies", function() {

  let server = new Server({
    models: {
      movie: Model
    },
    routes() {
      this.namespace = "api";
      this.resource("movie");
      this.get('http://localhost:8080/api/movies', () => {
        console.log('hi');
      })
    }
  });
  server.createList("movie", 10);

  cy.server({
    enabled: false
    // response(routeData) {
    //   return fetch(routeData.url, { method: routeData.method }).then(res =>
    //     res.json()
    //   );
    // }
  });

  // cy.route("/api/movies");

  cy.visit("/");
  cy.get("li.movie").should("have.length", 10);
});
