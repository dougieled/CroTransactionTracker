import transactionManager from "../api/transactionManager"
const TransactionModule = {
  namespaced: true,
  state: {
    transactions: []

  },
  mutations: {
    updateTransactions(state, data) {
      state.transactions = data
    },
    updateTransactionByID(state, data) {
      let index = state.transactions.findIndex(x => x.id===data.id)
      state.transactions.splice(index, 1, data)
    }

  },
  actions: {
    getMyTransactions({ commit }, data) {
      commit('updateTransactions', [])
      transactionManager.GetMyTransactions(data).then((res) => {
        if (res.status === 200) {
          commit('updateTransactions', res.data)
        }
      })
      .catch(() => {
          commit('user/updateUserDetails', null, {root:true})
          commit('user/updateLastApiCalledMade', null, {root:true})
      })

    },
    updateTransactionByID({ commit }, data) {
      transactionManager.RegisterUser(data, data.id, data.userId).then((res) => {
        if (res.status === 200) {
            if (res.status === 200) {
              commit('updateTransactionByID', res.data)
            }
        }
      })
    },
    updateTransactions({ commit }, { data, id }) {
      transactionManager.updateUserByID(data, id).then((res) => {
        if (res.status === 200) {
          commit('updateTransactions', res.data)
        }
      })
    }
  },
  getters: {
    transactions(state) {
      return state.transactions
    }
  }
}
export default TransactionModule
