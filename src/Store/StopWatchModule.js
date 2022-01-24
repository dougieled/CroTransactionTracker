const stopWatchModule = {
  namespaced: true,
  state: {
    halfOption: '1st Half',
    started: false,
    paused:false,
    startDateTime: null,
    dateTimeNow: null,
    pausedAtDateTime:null
  },
  mutations: {
    updateHalfOption (state, data) {
      state.halfOption = data
    },
    updateStarted (state, data) {
      state.started = data
    },
    updatePaused (state, data) {
      state.paused = data
    },
    updateStartDateTime (state, data) {
      state.startDateTime = data
    },
    updateDateTimeNow (state, data) {
      state.dateTimeNow = data
    },
    updatePausedAtDateTime (state, data) {
      state.pausedAtDateTime = data
    },
    handleUnpauseTimeDifference(state, data){
      let diffTime = Math.abs(data.pausedAtDateTime - data.dateNow);
      var newStartedDateTime = new Date(state.startDateTime);
      newStartedDateTime.setMilliseconds(newStartedDateTime.getMilliseconds() + diffTime);
      state.startDateTime = newStartedDateTime
    }
  },
  actions: {
    updateHalfOption ({ commit }, data) {
      commit('updateHalfOption', data)
    },
    updateStarted ({ commit }, data) {
      commit('updateStarted', data)
    },
    updatePaused ({ commit }, data) {
      commit('updatePaused', data)
    },
    updateStartDateTime ({ commit }, data) {
      commit('updateStartDateTime', data)
    },
    updateDateTimeNow ({ commit }, data) {
      commit('updateDateTimeNow', data)
    },
    updatePausedAtDateTime ({ commit }, data) {
      commit('updatePausedAtDateTime', data)
    },
    handleUnpause({commit, state}){
      const dto = {dateNow:new Date(),pausedAtDateTime:new Date(state.pausedAtDateTime)};
      commit('handleUnpauseTimeDifference',dto);
      commit('gameInformation/handleUnpauseTimeDifferenceTeamALastScore', dto, {root:true})
      commit('gameInformation/handleUnpauseTimeDifferenceTeamBLastScore', dto, {root:true})
      commit('updatePaused', false);
      commit('updatePausedAtDateTime',null);
    }
  },
  getters: {
    halfOption (state) {
      return state.halfOption
    },
    started (state) {
      return state.started
    },
    paused (state) {
      return state.paused
    },
    getStopwatch (state) {
      if (state.startDateTime == null || state.dateTimeNow == null) {
        return '00:00'
      } else {
        var timeDifference = new Date(state.startDateTime).getTime() - new Date(state.dateTimeNow).getTime()

        // Time elapsed in seconds
        var timeElapsed = Math.abs(timeDifference / 1000)

        // Time remaining in seconds
        var timeRemaining = timeElapsed

        // Convert seconds into minutes and seconds
        var minutes = Math.floor(timeRemaining / 60)
        var seconds = Math.floor(timeRemaining) - (60 * minutes)

        // Display minutes, add a 0 to the start if less than 10
        var result = (minutes < 10) ? '0' + minutes : minutes

        // Display seconds, add a 0 to the start if less than 10
        result += (seconds < 10) ? ':0' + seconds : ':' + seconds

        return result
      }
    },
    dateTimeNow (state) {
      return state.dateTimeNow
    },
    minutes (state) {
      var timeDifference = new Date(state.startDateTime).getTime() - new Date(state.dateTimeNow).getTime()

        // Time elapsed in seconds
        var timeElapsed = Math.abs(timeDifference / 1000)

        // Time remaining in seconds
        var timeRemaining = timeElapsed

        // Convert seconds into minutes and seconds
        var minutes = Math.floor(timeRemaining / 60)
      return minutes
    },
    pausedAtDateTime(state){
      state.pausedAtDateTime
    }
  }
}
export default stopWatchModule
