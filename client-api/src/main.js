// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: (h) => h(App),
// }).$mount('#app')

// Альтернативный вариант с axios
import Vue from 'vue'
import router from './router'
import VueRouter from 'vue-router'
import App from './App.vue'
import axios from 'axios'


axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL

Vue.config.productionTip = false
Vue.use(VueRouter)

const app = new Vue({
  render: (h) => h(App),
  router,
})
app.$mount('#app')
