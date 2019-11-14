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
      // this.passthrough(req => {
      //   // debugger;
      //   if (req.url.startsWith("/api")) {
      //     return false;
      //   } else {
      //     console.log("passin thru");
      //     console.log(req);
      //     return true;
      //   }
      // });
    },

    seeds(server) {
      server.createList("movie", 3);
    }
  });
}
