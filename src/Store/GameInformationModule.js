const gameInformation = {
  namespaced: true,
  state: {
    competition: 'Test Competition',
    hashtagArray: ['GAAScoreTracker'],
    teamA: {
      name: 'Team A',
      goals: 0,
      points: 0
    },
    teamB: {
      name: 'Team B',
      goals: 0,
      points: 0
    },
    totalDateTimeSinceTeamAScore: null,
    totalDateTimeSinceTeamBScore: null,
    showResetModal: false
  },
  mutations: {
    updateCompetitionName(state, data) {
      state.competition = data
    },
    updateHashtagArray(state, data) {
      state.hashtagArray = data
    },
    updateTeamA(state, data) {
      state.teamA = data
    },
    updateTeamAName(state, data) {
      state.teamA.name = data
    },
    updateTeamAGoals(state, data) {
      state.teamA.goals = data
    },
    updateTeamAPoints(state, data) {
      state.teamA.points = data
    },
    updateTeamB(state, data) {
      state.teamB = data
    },
    updateTeamBName(state, data) {
      state.teamB.name = data
    },
    updateTeamBGoals(state, data) {
      state.teamB.goals = data
    },
    updateTeamBPoints(state, data) {
      state.teamB.points = data
    },
    updateTotalDateTimeSinceTeamAScore(state, data) {
      state.totalDateTimeSinceTeamAScore = data
    },
    updateTotalDateTimeSinceTeamBScore(state, data) {
      state.totalDateTimeSinceTeamBScore = data
    },
    updateShowResetModal(state, data) {
      state.showResetModal = data
    },
    handleUnpauseTimeDifferenceTeamALastScore(state, data){
      if(state.totalDateTimeSinceTeamAScore>data.pausedAtDateTime){
        state.totalDateTimeSinceTeamAScore = data.dateNow
      }else{
        let diffTime = Math.abs(data.pausedAtDateTime - data.dateNow);
        var newStartedDateTime = new Date(state.totalDateTimeSinceTeamAScore);
        newStartedDateTime.setMilliseconds(newStartedDateTime.getMilliseconds() + diffTime);
        state.totalDateTimeSinceTeamAScore = newStartedDateTime
      }

    },
    handleUnpauseTimeDifferenceTeamBLastScore(state, data){
      if(state.totalDateTimeSinceTeamBScore>data.pausedAtDateTime){
        state.totalDateTimeSinceTeamBScore = data.dateNow
      }else{
      let diffTime = Math.abs(data.pausedAtDateTime - data.dateNow);

      var newStartedDateTime = new Date(state.totalDateTimeSinceTeamBScore);
      newStartedDateTime.setMilliseconds(newStartedDateTime.getMilliseconds() + diffTime);
      state.totalDateTimeSinceTeamBScore = newStartedDateTime
      }
    }
  },
  actions: {
    updateCompetitionName({ commit }, data) {
      commit('updateCompetitionName', data)
    },
    updateHashtagArray({ commit }, data) {
      commit('updateHashtagArray', data)
    },
    updateTeamA({ commit }, data) {
      commit('updateTeamA', data)
    },
    updateTeamAName({ commit }, data) {
      commit('updateTeamAName', data)
    },
    updateTeamAGoals({ commit }, data) {
      commit('updateTeamAGoals', data)
    },
    updateTeamAPoints({ commit }, data) {
      commit('updateTeamAPoints', data)
    },
    updateTeamB({ commit }, data) {
      commit('updateTeamB', data)
    },
    updateTeamBName({ commit }, data) {
      commit('updateTeamBName', data)
    },
    updateTeamBGoals({ commit }, data) {
      commit('updateTeamBGoals', data)
    },
    updateTeamBPoints({ commit }, data) {
      commit('updateTeamBPoints', data)
    },
    updateTotalDateTimeSinceTeamAScore({ commit }, data) {
      commit('updateTotalDateTimeSinceTeamAScore', data)
    },
    updateTotalDateTimeSinceTeamBScore({ commit }, data) {
      commit('updateTotalDateTimeSinceTeamBScore', data)
    },
    updateShowResetModal({ commit }, data) {
      commit('updateShowResetModal', data)
    }
  },
  getters: {
    competition(state) {
      return state.competition
    },
    hashtagArray(state) {
      return state.hashtagArray
    },
    teamA(state) {
      return state.teamA
    },
    teamB(state) {
      return state.teamB
    },
    isTeamInfoNeeded(state) {
      return !!(state.teamA.name === '' || state.teamB.name === '')
    },
    totalTimeSinceTeamAScore(state,getters, rootState) {
      if (rootState.gameInformation.totalDateTimeSinceTeamAScore == null || rootState.stopWatch.dateTimeNow == null) {
        return '00:00'
      } else {
        var timeDifference = new Date(rootState.gameInformation.totalDateTimeSinceTeamAScore).getTime() - new Date(rootState.stopWatch.dateTimeNow).getTime()

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
        state.totalDateTimeSinceTeamAScore>rootState.stopWatch.pausedAtDateTime

        return rootState.stopWatch.paused && state.totalDateTimeSinceTeamAScore>rootState.stopWatch.pausedAtDateTime?'00:00':result
      }
    },
    totalTimeSinceTeamBScore(state, getters,rootState) {
      if (rootState.gameInformation.totalDateTimeSinceTeamBScore == null || rootState.stopWatch.dateTimeNow == null) {
        return '00:00'
      } else {
        var timeDifference = new Date(rootState.gameInformation.totalDateTimeSinceTeamBScore).getTime() - new Date(rootState.stopWatch.dateTimeNow).getTime()

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

        return rootState.stopWatch.paused && state.totalDateTimeSinceTeamBScore>rootState.stopWatch.pausedAtDateTime?'00:00':result
      }
    },
    showResetModal(state) {
      return state.showResetModal
    },
    totalScoreTeamA(state) {
      const a = state.teamA.goals * 3
      const b = state.teamA.points
      return a + b
    },
    totalScoreTeamB(state) {
      const a = state.teamB.goals * 3
      const b = state.teamB.points
      return a + b
    },
    tweetInformation(state, getters, rootState, rootGetters) {
      const teamAScore = `${state.teamA.name} ${state.teamA.goals}:${
        state.teamA.points
        } (${getters['totalScoreTeamA']})\n`
      const teamBScore = `${state.teamB.name} ${state.teamB.goals}:${
        state.teamB.points
        } (${getters['totalScoreTeamB']})\n`
      return `${state.competition}\n${teamAScore}${teamBScore}${
        rootGetters['stopWatch/halfOption']
        }${getters['minutesInTweet']}`
    },
    minutesInTweet(state, getters, rootState, rootGetters) {
      return rootGetters['stopWatch/started'] === true ? ', ' + rootGetters['stopWatch/minutes'] + 'mins' : ''
    },
    teamInLead(state, getters, rootState) {
      // IF time == FT AET
      if (getters.totalScoreTeamA > getters.totalScoreTeamB) {
        const difference = getters.totalScoreTeamA - getters.totalScoreTeamB
        // Point or Points
        let points = 'points'
        difference === 1 ? points = 'point.' : points = 'points.'
        if (
          rootState.stopWatch.halfOption === 'Full Time' ||
          rootState.stopWatch.halfOption === 'After Extra Time'
        ) {
          return `${state.teamA.name} won by ${difference} ${points}\n`
        }
        return `${state.teamA.name} winning by ${difference} ${points}\n`
      }
      if (getters.totalScoreTeamB > getters.totalScoreTeamA) {
        const difference2 = getters.totalScoreTeamB - getters.totalScoreTeamA
        let points2 = 'points'
        difference2 === 1 ? points2 = 'point.' : points2 = 'points.'
        if (
          rootState.stopWatch.halfOption === 'Full Time' ||
          rootState.stopWatch.halfOption === 'After Extra Time'
        ) {
          return `${state.teamB.name} won by ${difference2} ${points2}\n`
        }
        return `${state.teamB.name} winning by ${difference2} ${points2}\n`
      }
      return 'All Level. \n'
    }
  }
}
export default gameInformation
