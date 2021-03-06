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
    },
    {
      path: '/Statistics',
      name: 'Statistics',
      component: () => import('./views/Statistics.vue')
    },
    {
      path: '/TransactionPeriods/:periodicity',
      name: 'TransactionPeriods',
      props:true,
      component: () => import('./views/TransactionPeriods.vue')
    }
  ]
})
