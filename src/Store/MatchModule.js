import matchManager from "../api/matchManager"
const MatchModule = {
  namespaced: true,
  state: {
    matches: []

  },
  mutations: {
    updateMatches(state, data) {
      state.matches = data
    },
    updateMatchByID(state, data) {
      let index = state.matches.findIndex(x => x.id===data.id)
      state.matches.splice(index, 1, data)
    }

  },
  actions: {
    getMyMatches({ commit }, data) {
      commit('updateMatches', [])
      matchManager.GetMyMatches(data).then((res) => {
        if (res.status === 200) {
          commit('updateMatches', res.data)
        }
      })
      .catch(() => {
          commit('user/updateUserDetails', null, {root:true})
          commit('user/updateLastApiCalledMade', null, {root:true})
      })

    },
    updateMatchByID({ commit }, data) {
      matchManager.RegisterUser(data, data.id, data.userId).then((res) => {
        if (res.status === 200) {
            if (res.status === 200) {
              commit('updateMatchByID', res.data)
            }
        }
      })
    },
    updateMatches({ commit }, { data, id }) {
      matchManager.updateUserByID(data, id).then((res) => {
        if (res.status === 200) {
          commit('updateMatches', res.data)
        }
      })
    }
  },
  getters: {
    matches(state) {
      return state.matches
    },
    showLogoutModal(state){
      return state.showLogoutModal
    }
  }
}
export default MatchModule
