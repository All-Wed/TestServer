import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'index',
    component: Home,
  },
  {
    path: '/mail',
    name: 'mail',
    component: () => import('./pages/Mail.vue')
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('./pages/Contacts.vue')
  }
]

const router = new VueRouter({
  // history: createWebHashHistory(),
  // history: createWebHistory(),
  mode: 'history',
  routes,
})

export default router