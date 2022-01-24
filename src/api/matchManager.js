import ApiClient from "./helpers/APIClient.js";
export default {
  GetRequestURL(route) {
    return "http://localhost:4000"+route;
  },
  CreateMatch(data,userId) {
    var route = this.GetRequestURL(`/matches/register/${userId}`);
    return ApiClient.apiPost(route, data, false).then();
  },
  GeAllMatches() {
    var route = this.GetRequestURL(`/matches`);
    return ApiClient.apiGet(route);
  },
  GetMyMatches(userId) {
    var route = this.GetRequestURL(`/matches/MyMatches/${userId}`);
    return ApiClient.apiGet(route);
  },
  // Sample API Calls
  updateMatchByID(dto, id, userId) {
    var route = this.GetRequestURL(`/matches/${id}/${userId}`);
    return ApiClient.apiPut(route, dto);
  },
  GetMatchByID(id) {
    var route = this.GetRequestURL(`/matches/${id}`);
    return ApiClient.apiGet(route);
  },
  DeleteMatch(id) {
    var route = this.GetRequestURL(`/matches/${id}`);
    return ApiClient.apiDelete(route);
  },
};
