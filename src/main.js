import '@babel/polyfill'
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './Store/store'
import './registerServiceWorker'
import { config } from '../firebaseConfig'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

var firebase = require('firebase')// eslint-disable-line

Vue.config.productionTip = false
firebase.initializeApp(config)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
