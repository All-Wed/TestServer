// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: (h) => h(App),
// }).$mount('#app')

// Альтернативный вариант с axios
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

const app = new Vue({
  render: (h) => h(App),
})
axios.defaults.baseURL = process.env.VUE_APP_HOST_API

app.$mount('#app')
