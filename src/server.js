import { Server, Model } from "@miragejs/server";

export function makeServer(environment = "development") {
  return new Server({
    environment,

    models: {
      movie: Model
    },

    routes() {
      this.namespace = "api";
      this.resource("movie");
    },

    seeds(server) {
      server.createList("movie", 3);
    }
  });
}
