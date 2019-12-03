import { Server, Factory, Model, RestSerializer } from "@miragejs/server";

export function makeServer({ environment = "development" } = {}) {
  return new Server({
    environment,

    models: {
      movie: Model
    },

    factories: {
      movie: Factory.extend({
        title(i) {
          return `Movie ${i + 1}`;
        }
      })
    },

    serializers: {
      application: RestSerializer
    },

    routes() {
      this.namespace = "api";
      this.resource("movies");
    },

    seeds(server) {
      server.createList("movie", 3);
    }
  });
}
