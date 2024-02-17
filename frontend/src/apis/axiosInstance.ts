import axios from 'axios'
import Cookies from 'js-cookie'
import { getStore, setStore } from '~/utils'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here, e.g., add authentication headers
    const token = getStore('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here, e.g., handling pagination
    return response.data
  },
  async (error) => {
    const originalRequest = error.config

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if ((error.response.status = 401 && !originalRequest._retry)) {
      try {
        const refreshToken = Cookies.get('refreshToken')
        if (!refreshToken) {
          window.location.href = '/login'
        }
        const response = await axios.post('/auth/refresh-token', { refreshToken })
        const { access_token, refresh_token } = response.data
        setStore('accessToken', access_token)
        Cookies.set('refreshToken', refresh_token)

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return axios(originalRequest)
      } catch (error) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
