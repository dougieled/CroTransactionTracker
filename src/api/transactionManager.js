import ApiClient from './helpers/APIClient.js'
export default {
  GetRequestURL(route) {
    return 'http://localhost:4000' + route
  },
  GetAll() {
    var route = this.GetRequestURL(`/transactions`)
    return ApiClient.apiGet(route)
  },
  GetTransactionByID(id) {
    var route = this.GetRequestURL(`/transactions/${id}`)
    return ApiClient.apiGet(route)
  },
  CreateTransactions(data, userId) {
    var route = this.GetRequestURL(`/transactions/register/${userId}`)
    return ApiClient.apiPost(route, data, false).then()
  },
  updateTransactionByID(dto, id, userId) {
    var route = this.GetRequestURL(`/transactions/${id}/${userId}`)
    return ApiClient.apiPut(route, dto)
  },
  GetAllTransactions() {
    var route = this.GetRequestURL(`/transactions/GetAllTransactions`)
    return ApiClient.apiGet(route)
  },
  GetAllDeposits() {
    var route = this.GetRequestURL(`/transactions/GetAllDeposits`)
    return ApiClient.apiGet(route)
  },
  DeleteTransaction(id) {
    var route = this.GetRequestURL(`/transactions/${id}`)
    return ApiClient.apiDelete(route)
  },

  GetAllMyRecords(userId) {
    var route = this.GetRequestURL(`/transactions/MyRecords/${userId}`)
    return ApiClient.apiGet(route)
  },
  GetAllMyTransactions(userId) {
    var route = this.GetRequestURL(`/transactions/MyTransactions/${userId}`)
    return ApiClient.apiGet(route)
  },
  GetAllMyDeposits(userId) {
    var route = this.GetRequestURL(`/transactions/MyDeposits/${userId}`)
    return ApiClient.apiGet(route)
  }
  
}
