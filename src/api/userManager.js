import ApiClient from "./helpers/APIClient.js";
export default {
  GetRequestURL(route) {
    let url = 'https://mysql-backend.herokuapp.com'
    if(process.env.NODE_ENV == 'development'){
      url = 'http://localhost:4000'
    }
    return url + route
  },
  RegisterUser(data) {
    var route = this.GetRequestURL("/users/register");
    return ApiClient.apiPost(route, data, false).then();
  },
  Login(data) {
    var route = this.GetRequestURL("/users/authenticate");
    return ApiClient.apiPost(route, data, false).then();
  },
  // Sample API Calls
  updateUserByID(dto, id) {
    var route = this.GetRequestURL(`/users/${id}`);
    return ApiClient.apiPut(route, dto);
  },
  GetUserByID(id) {
    var route = this.GetRequestURL(`/users/${id}`);
    return ApiClient.apiGet(route);
  },
  GetCurrentUser() {
    var route = this.GetRequestURL(`/users/current`);
    return ApiClient.apiGet(route);
  },
  DeleteUser(id) {
    var route = this.GetRequestURL(`/users/${id}`);
    return ApiClient.apiDelete(route);
  },
};
