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
      path: '/Upload',
      name: 'Upload',
      component: () => import('./views/Upload.vue')
    },
    {
      path: '/MyAccount',
      name: 'MyAccount',
      component: () => import('./views/MyAccount.vue')
    }
  ]
})
