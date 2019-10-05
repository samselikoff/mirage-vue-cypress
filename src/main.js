import Vue from 'vue'
import App from './App.vue'
// import { makeServer } from './server'

// makeServer()

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
