import Vue from 'vue'
import Vuex from 'vuex'

import GameInformationModule from './GameInformationModule'
import StopWatchModule from './StopWatchModule'
import UserModule from './UserModule'
import MatchModule from './MatchModule'

import VuexPersist from 'vuex-persist'
const vuexPersist = new VuexPersist({
  key: 'GaaScoreTracker',
  storage: localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    gameInformation: GameInformationModule,
    stopWatch: StopWatchModule,
    user:UserModule,
    match:MatchModule
  },
  plugins: [vuexPersist.plugin]
})
