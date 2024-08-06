import axiosInstance from './axiosInstance'
import { createApi } from '@reduxjs/toolkit/query/react'
import type { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import type { AxiosRequestConfig, AxiosError } from 'axios'
import {
  CreateTaskField,
  EditTaskField,
  LoginField,
  NewPasswordField,
  RegisterField,
  ResendOTPField,
  VerifyOTPField
} from '~/@types/form.type'
import { ProfileType } from '~/@types/response.type'
import { Task } from '~/@types/task.type'
import { DOMAIN_API } from '~/constants'

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
  baseQuery: axiosBaseQuery({ baseUrl: `${DOMAIN_API}/api` }),
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
      }),
      getAllTasks: build.query<Task[], void>({
        query: () => ({ url: '/tasks', method: 'get' })
      }),
      getTaskById: build.query<Task, string>({
        query: (id) => ({ url: `/tasks/${id}`, method: 'get' })
      }),
      addTask: build.mutation({
        query: (data: CreateTaskField) => ({ url: '/tasks', method: 'post', data: data })
      }),
      editTask: build.mutation({
        query: ({ data, params }: { data: EditTaskField; params: { id: string } }) => ({
          url: `/tasks/${params.id}`,
          method: 'put',
          data: data
        })
      }),
      deleteTask: build.mutation({
        query: ({ params }: { params: { id: string } }) => ({ url: `/tasks/${params.id}`, method: 'delete' })
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
  usePostAvatarMutation,
  useGetAllTasksQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useEditTaskMutation,
  useDeleteTaskMutation
} = api
