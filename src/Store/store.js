import Vue from 'vue'
import Vuex from 'vuex'

import UserModule from './UserModule'
import TransactionModule from './TransactionModule'
import SettingModule from './SettingModule'

import VuexPersist from 'vuex-persist'
const vuexPersist = new VuexPersist({
  key: 'CroTransactionTracker',
  storage: localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user:UserModule,
    transaction:TransactionModule,
    setting:SettingModule
  },
  plugins: [vuexPersist.plugin]
})
