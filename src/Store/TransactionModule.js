import transactionManager from '../api/transactionManager'
import { getField, updateField } from 'vuex-map-fields'
import getSymbolFromCurrency from 'currency-symbol-map'
import moment from 'moment'
const TransactionModule = {
  namespaced: true,
  state: {
    transactions: [],
    date: null,
    endDate: null,
    showTransactions: true,
    showDeposits: true,
    showATMWithdrawals: true,
    period: null,
    isLoading: false
  },
  mutations: {
    updateField,
    updateTransactions(state, data) {
      state.transactions = data
    },
    updateTransactionByID(state, data) {
      let index = state.transactions.findIndex(x => x.id === data.id)
      state.transactions.splice(index, 1, data)
    },
    updateDate(state, data) {
      state.date = data
    },
    updateIsLoading(state, data) {
      state.isLoading = data
    }
  },
  actions: {
    getMyRecords({ commit }) {
      return new Promise((resolve, reject) => {
        commit('updateTransactions', [])
        commit('updateIsLoading', true)
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
            reject()
          })
          .finally(() => {
            commit('updateIsLoading', false)
            resolve()
          })
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
    },
    getPreviousDay({ commit, state }) {
      commit(
        'updateDate',
        moment(state.date)
          .subtract(1, 'd')
          .format('YYYY-MM-DD')
      )
    },
    getNextDay({ commit, state }) {
      commit(
        'updateDate',
        moment(state.date)
          .add(1, 'd')
          .format('YYYY-MM-DD')
      )
    },
    getPreviousWeek({ commit, state }) {
      commit(
        'updateDate',
        moment(state.date)
          .subtract(7, 'd')
          .format('YYYY-MM-DD')
      )
    },
    getNextWeek({ commit, state }) {
      commit(
        'updateDate',
        moment(state.date)
          .add(7, 'd')
          .format('YYYY-MM-DD')
      )
    },
    getPreviousMonth({ commit, state }) {
      commit(
        'updateDate',
        moment(state.date)
          .subtract(1, 'months')
          .format('YYYY-MM-DD')
      )
    },
    getNextMonth({ commit, state }) {
      commit(
        'updateDate',
        moment(state.date)
          .add(1, 'months')
          .format('YYYY-MM-DD')
      )
    },
    setDate({ commit, state }) {
      commit('updateDate', new Date().toISOString().slice(0, 10))
    },
    setDateWeekly({ commit, state }) {
      //Set date to be first available Sunday nearest to todays date
      var now = new Date()
      var today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12)
      var lastSunday = new Date(today.setDate(today.getDate() - today.getDay()))
      commit('updateDate', lastSunday.toISOString().slice(0, 10))
    },
    setDateMonth({ commit, state }) {
      var date = new Date()
      commit(
        'updateDate',
        new Date(date.getFullYear(), date.getMonth(), 1, 12)
          .toISOString()
          .slice(0, 10)
      )
    }
  },
  getters: {
    getField,
    transactions(state, getters, rootState, rootGetters) {
      return state.transactions.map(x => {
        let minutesToAdd = rootGetters['setting/utcOffsetTimeDifference']
        return {
          ...x,
          timestampFormatted: moment(x.timestamp)
            .add(minutesToAdd, 'minutes')
            .format('DD/MM/YYYY HH:mm'),
          timestamp: moment(x.timestamp).add(minutesToAdd, 'minutes'),
          amountFormatted: Math.abs(x.amount),
          isDepositFormatted: x.isDeposit ? 'Yes' : 'No'
        }
      })
    },
    transactionsByFilter(state, getters) {
      if (state.period === 'Daily') {
        return getters.transactions.filter(x =>
          moment(x.timestamp).isSame(moment(getters.dateWithTime), 'day')
        )
      } else if (state.period === 'Weekly') {
        let endDate = moment(getters.dateWithTime).add(6, 'd')
        endDate = moment(endDate).add(12, 'h')
        return getters.transactions.filter(
          x =>
            moment(x.timestamp).isSameOrAfter(
              moment(getters.dateWithTime),
              'day'
            ) && moment(x.timestamp).isSameOrBefore(moment(endDate), 'day')
        )
      } else if (state.period === 'Custom') {
        return getters.transactions.filter(
          x =>
            moment(x.timestamp).isSameOrAfter(
              moment(getters.dateWithTime),
              'day'
            ) &&
            moment(x.timestamp).isSameOrBefore(
              moment(getters.endDateWithTime),
              'day'
            )
        )
      } else if(state.period ==='Monthly') {
        return getters.transactions.filter(x =>
          moment(x.timestamp).isSame(moment(getters.dateWithTime), 'month')
        )
      }else{
        return getters.transactions
      }
    },
    deposits(state, getters) {
      return getters.transactionsByFilter.filter(x => x.isDeposit)
    },
    transactionNoDeposit(state, getters) {
      return getters.transactionsByFilter.filter(x => !x.isDeposit)
    },
    dateWithTime(state) {
      return moment(state.date).add(12, 'hours')
    },
    endDateWithTime(state) {
      return moment(state.endDate).add(12, 'hours')
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
    totalAmountSpentOverall(state, getters) {
      let amounts = getters.transactionNoDeposit
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
    },
    averageDailySpend(state, getters) {
      var arr = getters.transactions.map(x =>
        moment(x.timestamp).format('DD/MM/YYYY')
      )
      var uniqueDates = [...new Set(arr)]
      let uniqueNumberOfDays = uniqueDates.length
      let amount = getters.totalAmountSpentOverall / uniqueNumberOfDays
      return amount.toFixed(2)
    },
    currencySymbol(state) {
      let currencyText =
        state.transactions.length > 0
          ? state.transactions[0].nativeCurrency
          : ''
      return currencyText ? getSymbolFromCurrency(currencyText) : '£'
    },
    cheapestDay(state, getters) {
      // this gives an object with dates as keys
      const groups = getters.transactionNoDeposit.reduce((groups, transaction) => {
        let date = transaction.timestamp.format().split('T')[0]
        if (!groups[date]) {
          groups[date] = []
        }
        groups[date].push(transaction)
        return groups
      }, {})
      // Edit: to add it in the array format instead
      const groupArrays = Object.keys(groups).map(date => {

        var sum = 0
        let selectedGroup = groups[date]

        let amountsTotal = selectedGroup.map(x => x.amountFormatted)

        for (var i = 0; i < amountsTotal.length; i++) {
          sum += amountsTotal[i]
        }
        return {
          date,
          formattedDate:moment(date).format('DD/MM/YYYY'),
          total: parseFloat(sum.toFixed(2))
        }
      })
      const lowestAmount = groupArrays.reduce((prev, current) => {
        return (prev.total < current.total) ? prev : current
    },[]) //returns object
      return lowestAmount
    },
    dearestDay(state, getters) {
      // this gives an object with dates as keys
      const groups = getters.transactionNoDeposit.reduce((groups, transaction) => {
        let date = transaction.timestamp.format().split('T')[0]
        if (!groups[date]) {
          groups[date] = []
        }
        groups[date].push(transaction)
        return groups
      }, {})
      // Edit: to add it in the array format instead
      const groupArrays = Object.keys(groups).map(date => {

        var sum = 0
        let selectedGroup = groups[date]

        let amountsTotal = selectedGroup.map(x => x.amountFormatted)

        for (var i = 0; i < amountsTotal.length; i++) {
          sum += amountsTotal[i]
        }
        return {
          date,
          formattedDate:moment(date).format('DD/MM/YYYY'),
          total: parseFloat(sum.toFixed(2))
        }
      })
      const dearestAmount = groupArrays.reduce((prev, current) => {
        return (prev.total > current.total) ? prev : current
    },[]) //returns object
      return dearestAmount
    }
  }
}
export default TransactionModule
