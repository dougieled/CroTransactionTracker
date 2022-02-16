import axios from 'axios'
import store from '../../Store/store.js'

let loginUrl, logoutUrl

const axiosMessagemixin = {
  data() {
    return {}
  },
  created: function() {
    axios.interceptors.request.use(function(request) {
      // Do something before request is sent
      // If it hasnt already been set add the no-cache header to prevent caching of api calls
      if (!request.headers['Pragma']) {
        request.headers['Pragma'] = 'no-cache'
        request.headers['X-Requested-With'] = 'XMLHttpRequest'
      }
      return request
    })
  },
  methods: {
    showAPIErrorToast: function(requestUrl, message) {
      let errorMessageDisplay = requestUrl
      if (message) {
        errorMessageDisplay += ` Failed with the response: ${JSON.stringify(
          message
        )}`
      }
      // stToast({
      //   type: 'danger',
      //   title: 'Failed API Call',
      //   message: errorMessageDisplay,
      //   expire: 5
      // })
      console.log(errorMessageDisplay)
    }
  }
}

export { axiosMessagemixin }

function includeBearerToken(config) {
  let token = store.getters['user/userDetails']?.token
  // if a bearer token exists attempt to include it in the api call
  if (token) {
    const tokenHeader = {
      Authorization: `Bearer ${token}`
    }
    config = addHeaderToConfig(config, tokenHeader)
  }
  return config
}

function includeNoCacheHeader(config) {
  const noCacheHeader = {
    Pragma: 'no-cache'
  }
  config = includeBearerToken(config)
  config = addHeaderToConfig(config, noCacheHeader)

  return config
}

function addHeaderToConfig(config, header) {
  // Add the property to the existing config, otherwise create it
  if (config) {
    if (config.headers) {
      config.headers = { ...config.headers, ...header }
    } else {
      config.headers = header
    }
  } else {
    config = {
      headers: header
    }
  }
  return config
}

export default {
  data() {
    return {
      apiResponse: [],
      apiError: []
    }
  },
  setLogoutUrl(url) {
    logoutUrl = url
  },
  setLoginUrl(url) {
    loginUrl = url
  },
  getLogoutUrl() {
    return logoutUrl
  },
  getLoginUrl() {
    return loginUrl
  },

  apiGet(uri, config) {
    return axios.get(uri, includeNoCacheHeader(config))
  },

  apiPost(uri, data, config) {
    return axios.post(uri, data, includeBearerToken(config))
  },
  apiPostImage(uri, data) {
    let formData = new FormData();
    formData.append("file", data);
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    return axios.post(uri, formData, includeBearerToken(config))
  },

  apiPut(uri, data, config) {
    return axios.put(uri, data, includeBearerToken(config))
  },

  apiDelete(uri, config) {
    return axios.delete(uri, includeBearerToken(config))
  }
}
