import Vue from 'vue'
import Vuex from 'vuex'

import UserModule from './UserModule'
import TransactionModule from './TransactionModule'

import VuexPersist from 'vuex-persist'
const vuexPersist = new VuexPersist({
  key: 'CroTransactionTracker',
  storage: localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user:UserModule,
    transaction:TransactionModule
  },
  plugins: [vuexPersist.plugin]
})
