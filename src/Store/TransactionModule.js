import transactionManager from '../api/transactionManager'
import { getField, updateField } from 'vuex-map-fields'

import moment from 'moment'
const TransactionModule = {
  namespaced: true,
  state: {
    transactions: [],
    date: null,
    showTransactions: true,
    showDeposits: true,
    showATMWithdrawals: true
  },
  mutations: {
    updateField,
    updateTransactions(state, data) {
      state.transactions = data
    },
    updateTransactionByID(state, data) {
      let index = state.transactions.findIndex(x => x.id === data.id)
      state.transactions.splice(index, 1, data)
    }
  },
  actions: {
    getMyRecords({ commit }) {
      commit('updateTransactions', [])
      transactionManager
        .GetAllMyRecords()
        .then(res => {
          if (res.status === 200) {
            commit('updateTransactions', res.data)
          }
        })
        .catch(() => {
          commit('user/updateUserDetails', null, { root: true })
          commit('user/updateLastApiCalledMade', null, { root: true })
        })
    },
    updateTransactionByID({ commit }, data) {
      transactionManager.updateTransactionByID(data, data.id).then(res => {
        if (res.status === 200) {
          if (res.status === 200) {
            commit('updateTransactionByID', res.data)
          }
        }
      })
    },
    updateTransactions({ commit }, { data, id }) {
      transactionManager.updateUserByID(data, id).then(res => {
        if (res.status === 200) {
          commit('updateTransactions', res.data)
        }
      })
    }
  },
  getters: {
    getField,
    transactions(state, getters, rootState, rootGetters) {
      return state.transactions.map(x => {
        let minutesToAdd = rootGetters['setting/utcOffsetTimeDifference']
        return {
          ...x,
          timestamp: moment(x.timestamp).add(minutesToAdd, 'minutes'),
          timestampFormatted: moment(x.timestamp)
            .add(minutesToAdd, 'minutes')
            .format('DD/MM/YYYY HH:mm'),
          amountFormatted: Math.abs(x.amount),
          isDepositFormatted: x.isDeposit ? 'Yes' : 'No'
        }
      })
    },
    transactionsByDayFilter(state, getters) {
      return getters.transactions.filter(x =>
        moment(moment(x.timestamp)).isSame(moment(getters.dateWithTime), 'day')
      )
    },
    deposits(state, getters) {
      return getters.transactionsByDayFilter.filter(x => x.isDeposit)
    },
    transactionNoDeposit(state, getters) {
      return getters.transactionsByDayFilter.filter(x => !x.isDeposit)
    },
    dateWithTime(state) {
      return moment(state.date).add(12, 'hours')
    },
    totalAmountSpent(state, getters) {
      let amounts = state.showATMWithdrawals
        ? getters.transactionNoDeposit.filter(x => !x.isDeposit)
        : getters.transactionNoDeposit.filter(
            x => !x.isDeposit && x.description !== 'ATM'
          )
      let amountsTotal = amounts.map(x => x.amountFormatted)
      var sum = 0
      for (var i = 0; i < amountsTotal.length; i++) {
        sum += amountsTotal[i]
      }
      return sum.toFixed(2)
    },
    totalAmountWithdrew(state, getters) {
      let amounts = getters.transactionNoDeposit.filter(
        x => !x.isDeposit && x.description === 'ATM'
      )
      let amountsTotal = amounts.map(x => x.amountFormatted)
      var sum = 0
      for (var i = 0; i < amountsTotal.length; i++) {
        sum += amountsTotal[i]
      }
      return sum.toFixed(2)
    },
    totalAmountDeposited(state, getters) {
      let amounts = getters.deposits
        .filter(x => x.isDeposit)
        .map(x => x.amountFormatted)
      var sum = 0
      for (var i = 0; i < amounts.length; i++) {
        sum += amounts[i]
      }
      return sum.toFixed(2)
    },
    records(state, getters) {
      let array = []
      if (state.showTransactions) {
        array = array.concat(
          getters.transactionNoDeposit.filter(x => x.description !== 'ATM')
        )
      }
      if (state.showDeposits) {
        array = array.concat(getters.deposits)
      }
      if (state.showATMWithdrawals) {
        array = array.concat(
          getters.transactionNoDeposit.filter(x => x.description === 'ATM')
        )
      }
      return array.sort((a, b) =>
        a.timestamp > b.timestamp ? 1 : b.timestamp > a.timestamp ? -1 : 0
      )
    }
  }
}
export default TransactionModule
