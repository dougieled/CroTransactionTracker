import userManager from "../api/userManager"
const UserModule = {
  namespaced: true,
  state: {
    userDetails: null,
    lastApiCallMade: null,
    showLogoutModal:false

  },
  mutations: {
    updateUserDetails(state, data) {
      state.userDetails = data
    },
    updateLastApiCalledMade(state, data) {
      state.lastApiCallMade = data
    },
    updateShowLogoutModal(state, data) {
      state.showLogoutModal = data
    },

  },
  actions: {
    login({ commit }, data) {
      userManager.Login(data).then((res) => {
        if (res.status === 200) {
          commit('updateUserDetails', res.data)
          commit('updateLastApiCalledMade', new Date())
        }
      })
    },
    logout({ commit }) {
      commit('updateUserDetails', null)
      commit('updateLastApiCalledMade', null)
    },
    register({ commit }, data) {
      userManager.RegisterUser(data).then((res) => {
        if (res.status === 200) {
          let newData = { username: data.username, password: data.password }
          userManager.Login(newData).then((res) => {
            if (res.status === 200) {
              commit('updateUserDetails', res.data)
              commit('updateLastApiCalledMade', new Date())
            }
          })
        }
      })
    },
    updateUserDetails({ commit }, { data, id }) {
      userManager.updateUserByID(data, id).then((res) => {
        if (res.status === 200) {
          commit('updateUserDetails', res.data)
          commit('updateLastApiCalledMade', new Date())
        }
      })
    },
    updateLastApiCalledMade({ commit }, data) {
      commit('updateLastApiCalledMade', data)
    },
    updateShowLogoutModal({ commit }, data) {
      commit('updateShowLogoutModal', data)
    },
    getCurrentUser({ commit }) {
      userManager.GetCurrentUser().then((res) => {
        if (res.status === 200) {
          commit('updateUserDetails', res.data)
          commit('updateLastApiCalledMade', new Date())
        }
      })
      .catch(() => {
          commit('updateUserDetails', null)
          commit('updateLastApiCalledMade', null)
      })
    },
  },
  getters: {
    userDetails(state) {
      return state.userDetails
    },
    lastApiCallMade(state) {
      return state.lastApiCallMade
    },
    showLogoutModal(state){
      return state.showLogoutModal
    }
  }
}
export default UserModule
