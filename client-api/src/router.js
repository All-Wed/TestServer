import VueRouter from 'vue-router'
import Home from './pages/Index'

export default new VueRouter({
  routes: [
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
  ],
  mode: 'history'
})
