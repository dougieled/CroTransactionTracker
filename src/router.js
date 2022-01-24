import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/Settings',
      name: 'settings',
      component: () => import('./views/Settings.vue')
    },
    {
      path: '/MyAccount',
      name: 'MyAccount',
      component: () => import('./views/MyAccount.vue')
    }
  ]
})
