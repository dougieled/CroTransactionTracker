import transactionManager from "../api/transactionManager"
import moment from 'moment'
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
    getMyRecords({ commit }) {
      commit('updateTransactions', [])
      transactionManager.GetAllMyRecords().then((res) => {
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
      transactionManager.updateTransactionByID(data, data.id).then((res) => {
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
      return state.transactions.map(x =>{
        return {
          ...x,
          timestampFormatted:moment(x.timestamp).format('DD/MM/YYYY HH:mm'),
          amountFormatted:Math.abs(x.amount),
          isDepositFormatted:x.isDeposit?'Yes':'No'
          
        }
      })
    }
  }
}
export default TransactionModule
