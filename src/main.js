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

if (window.Cypress) {
  new Server({
    routes() {
      this.get("/*", (schema, request) => {
        return window.handleFromCypress(request);
      });
      this.patch("/*", (schema, request) => {
        return window.handleFromCypress(request);
      });
      this.post("/*", (schema, request) => {
        return window.handleFromCypress(request);
      });
      this.delete("/*", (schema, request) => {
        return window.handleFromCypress(request);
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
