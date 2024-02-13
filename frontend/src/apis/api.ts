import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { LoginField, RegisterField } from '~/@types/form.type'
import { getStore } from '~/utils'

type AxiosBaseQueryResult = {
  data?: any
  error?: {
    status: number
    data: string | AxiosError
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
    const token = getStore('accessToken')
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...headers }
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

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints(build) {
    return {
      login: build.mutation({
        query: (data: LoginField) => ({ url: '/users/login', method: 'post', data: data })
      }),
      register: build.mutation({
        query: (data: RegisterField) => ({ url: '/users/register', method: 'post', data: data })
      })
    }
  }
})

export const { useLoginMutation, useRegisterMutation } = api
