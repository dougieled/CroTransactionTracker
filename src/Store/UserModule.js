import userManager from "../api/userManager";
const UserModule = {
  namespaced: true,
  state: {
    userDetails: null,
    lastApiCallMade: null,
    showLogoutModal: false
  },
  mutations: {
    updateUserDetails(state, data) {
      state.userDetails = data;
    },
    updateLastApiCalledMade(state, data) {
      state.lastApiCallMade = data;
    },
    updateShowLogoutModal(state, data) {
      state.showLogoutModal = data;
    }
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        userManager
          .Login(data)
          .then(res => {
            if (res.status === 200) {
              commit("updateUserDetails", res.data);
              commit("updateLastApiCalledMade", new Date());
              resolve(true);
            }
          })
          .catch(() => {
            reject(false);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        commit("updateUserDetails", null);
        commit("updateLastApiCalledMade", null);
        resolve(true);
      });
    },
    register({ commit }, data) {
      return new Promise((resolve, reject) => {
        userManager.RegisterUser(data).then(res => {
          if (res.status === 200) {
            let newData = { username: data.username, password: data.password };
            userManager
              .Login(newData)
              .then(res => {
                if (res.status === 200) {
                  commit("updateUserDetails", res.data);
                  commit("updateLastApiCalledMade", new Date());
                  resolve(true);
                }
              })
              .catch(() => {
                reject(false);
              });
          }
        });
      });
    },
    updateUserDetails({ commit }, { data, id }) {
      return new Promise((resolve, reject) => {
        userManager
          .updateUserByID(data, id)
          .then(res => {
            if (res.status === 200) {
              commit("updateUserDetails", res.data);
              commit("updateLastApiCalledMade", new Date());
              resolve(true);
            }
          })
          .catch(() => {
            reject(false);
          });
      });
    },
    updateLastApiCalledMade({ commit }, data) {
      commit("updateLastApiCalledMade", data);
    },
    updateShowLogoutModal({ commit }, data) {
      commit("updateShowLogoutModal", data);
    },
    getCurrentUser({ commit }) {
      return new Promise((resolve, reject) => {
        userManager
          .GetCurrentUser()
          .then(res => {
            if (res.status === 200) {
              commit("updateUserDetails", res.data);
              commit("updateLastApiCalledMade", new Date());
              resolve(true);
            }
          })
          .catch(() => {
            commit("updateUserDetails", null);
            commit("updateLastApiCalledMade", null);
            reject(false);
          });
      });
    }
  },
  getters: {
    userDetails(state) {
      return state.userDetails;
    },
    lastApiCallMade(state) {
      return state.lastApiCallMade;
    },
    showLogoutModal(state) {
      return state.showLogoutModal;
    }
  }
};
export default UserModule;
