import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { getStore, setStore } from '~/utils' // Assuming this is a utility module for managing local storage

// Create a new Axios instance with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor to add authentication headers if a token is present
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

// Add a response interceptor to handle response data and token refreshing
axiosInstance.interceptors.response.use(
  (response) => {
    // You can modify the response data here, e.g., handling pagination
    return response.data
  },
  async (error) => {
    const originalRequest = error.config

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        const refreshToken = Cookies.get('refreshToken')
        if (!refreshToken) {
          // Redirect to the login page if no refresh token is present
          window.location.href = '/login'
        }

        // Refresh the token using a separate API endpoint
        const response = await axios.post('/auth/refresh-token', { refreshToken })
        const { access_token, refresh_token } = response.data

        // Set the new tokens in local storage and cookies
        setStore('accessToken', access_token)
        Cookies.set('refreshToken', refresh_token)

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return axios(originalRequest)
      } catch (error) {
        // If token refresh fails, redirect to the login page
        window.location.href = '/login'
      }
    }

    return Promise.reject(error as AxiosError)
  }
)

export default axiosInstance
