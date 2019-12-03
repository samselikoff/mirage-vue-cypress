import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import { makeServer } from "./server";
import { Server } from "@miragejs/server";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";

if (process.env.NODE_ENV === "development") {
  window.server = makeServer();
}

/*
  If Cypress is running, define a new (2nd) Mirage instance in the app's
  iframe. This is not going to use any of the config or data from our 
  "real" Mirage server – instead, it is just going to intercept requests,
  and call the window.handleFromCypress function to respond.

  That function gets set from the Cypress iframe, which has access to the
  "real" Mirage server.
 */
if (window.Cypress) {
  new Server({
    routes() {
      ["get", "put", "patch", "post", "delete"].forEach(method => {
        this[method]("/*", (schema, request) => {
          return window.handleFromCypress(request);
        });
      });
    }
  });
}

Vue.config.productionTip = false;
Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: MovieList },
    { path: "/movies/:id", component: MovieDetail }
  ]
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
