import Vue from "vue";
import App from "./App.vue";
import { makeServer } from "./server";
import { Server } from "@miragejs/server";

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {
  window.server = makeServer();
}

if (window.Cypress) {
  console.log("HI");

  new Server({
    routes() {
      this.get("/*", (schema, request) => {
        return window.handleFromCypress(request);
      });
      this.delete("/*", (schema, request) => {
        return window.handleFromCypress(request);
      });
    }
  });
}

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
