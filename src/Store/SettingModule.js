import { minimalTimezoneSet } from 'compact-timezone-list'
const SettingModule = {
  namespaced: true,
  state: {
    utcOffset: '(GMT+00:00) London',
    utcOffsetOptions: minimalTimezoneSet
  },
  mutations: {
    updateUtcOffset(state, data) {
      state.utcOffset = data
    }
  },
  actions: {
    updateUtcOffset({ commit }, payload) {
      commit('updateUtcOffset', payload)
    }
  },
  getters: {
    utcOffsetTimeDifference(state) {
      let offset = state.utcOffsetOptions.find(x => x.label === state.utcOffset)
        .offset
      var minutesOffset = parseInt(offset[1] + offset[2]) * 60

      return parseInt(offset[0] + minutesOffset.toString())
    },
    utcOffset(state) {
      return state.utcOffset
    },
    utcOffsetOptions(state) {
      return state.utcOffsetOptions.sort((a, b) =>
        a.label > b.label ? 1 : b.label > a.label ? -1 : 0
      )
    }
  }
}
export default SettingModule
