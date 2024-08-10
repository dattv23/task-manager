import { BaseQueryFn } from '@reduxjs/toolkit/query'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'
import { ACCESS_TOKEN, DOMAIN_API, REFRESH_TOKEN } from '~/constants'
import { getStore, setStore } from '~/utils' // Assuming this is a utility module for managing local storage

// Create a new Axios instance with a base URL and default headers
const axiosInstance = axios.create({
  baseURL: `${DOMAIN_API}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor to add authentication headers if a token is present
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request config here, e.g., add authentication headers
    const token = getStore(ACCESS_TOKEN)
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
        const refresh_token = await Cookies.get(REFRESH_TOKEN)
        if (!refresh_token) {
          // Redirect to the login page if no refresh token is present
          window.location.href = '/login'
        }

        // Refresh the token using a separate API endpoint
        const response = await axiosInstance.post('/auth/refresh-token', { refreshToken: refresh_token })
        const { accessToken, refreshToken } = response.data

        // Set the new tokens in local storage and cookies
        setStore(ACCESS_TOKEN, accessToken)
        Cookies.set(REFRESH_TOKEN, refreshToken)

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axios(originalRequest)
      } catch (error) {
        // If token refresh fails, redirect to the login page
        window.location.href = '/login'
      }
    }

    return Promise.reject(error as AxiosError)
  }
)

type AxiosBaseQueryResult = {
  data: any
  error?: {
    status?: number
    data: any
  }
}

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string
      method: AxiosRequestConfig['method']
      data?: AxiosRequestConfig['data']
      params?: AxiosRequestConfig['params']
      headers?: AxiosRequestConfig['headers']
    },
    unknown,
    AxiosBaseQueryResult
  > =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message
        }
      }
    }
  }

export { axiosInstance, axiosBaseQuery }
