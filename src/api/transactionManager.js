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
  CreateTransactions(data) {
    var route = this.GetRequestURL(`/transactions/register`)
    return ApiClient.apiPost(route, data, false).then()
  },
  updateTransactionByID(dto, id) {
    var route = this.GetRequestURL(`/transactions/${id}`)
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

  GetAllMyRecords() {
    var route = this.GetRequestURL(`/transactions/MyRecords`)
    return ApiClient.apiGet(route)
  },
  GetAllMyTransactions() {
    var route = this.GetRequestURL(`/transactions/MyTransactions`)
    return ApiClient.apiGet(route)
  },
  GetAllMyDeposits() {
    var route = this.GetRequestURL(`/transactions/MyDeposits`)
    return ApiClient.apiGet(route)
  }
  
}
