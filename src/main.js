import Vue from "vue";
import App from "./App.vue";
import { makeServer } from "./server";

if (process.env.NODE_ENV === "development") {
  window.server = makeServer();
} else if (window.Cypress) {
  window.server = makeServer("test");
  window.runCypressMirageFunctions();
}

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
