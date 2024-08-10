import { createApi } from '@reduxjs/toolkit/query/react'

import { DOMAIN_API } from '~/constants'
import { axiosBaseQuery } from '~/configs'
import { LoginField, NewPasswordField, RegisterField, ResendOTPField, VerifyOTPField } from '~/@types/form.type'

export const apiAuth = createApi({
  reducerPath: 'apiAuth',
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
      })
    }
  }
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyOTPMutation,
  useResendOTPMutation,
  useResetPasswordMutation
} = apiAuth
