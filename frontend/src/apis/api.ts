import axiosInstance from './axiosInstance'
import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import { LoginField, NewPasswordField, RegisterField, ResendOTPField, VerifyOTPField } from '~/@types/form.type'
import { ProfileType } from '~/@types/response.type'

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

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  endpoints(build) {
    return {
      login: build.mutation({
        query: (data: LoginField) => ({ url: '/auth/login', method: 'post', data: data })
      }),
      register: build.mutation({
        query: (data: RegisterField) => ({ url: '/auth/register', method: 'post', data: data })
      }),
      verifyOTP: build.mutation({
        query: (data: VerifyOTPField) => ({ url: '/auth/verify-otp', method: 'post', data: data })
      }),
      resendOTP: build.mutation({
        query: (data: ResendOTPField) => ({ url: '/auth/resend-otp', method: 'post', data: data })
      }),
      resetPassword: build.mutation({
        query: (data: NewPasswordField) => ({ url: '/auth/reset-password', method: 'post', data: data })
      }),
      getProfile: build.query<ProfileType, void>({
        query: () => ({ url: '/users/@me/profile', method: 'get' })
      }),
      postAvatar: build.mutation({
        query: (data: FormData) => ({
          url: `/users/@me/avatar`,
          method: 'PUT',
          data: data,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      })
    }
  }
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useResetPasswordMutation,
  useGetProfileQuery,
  usePostAvatarMutation
} = api
