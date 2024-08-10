import { createApi } from '@reduxjs/toolkit/query/react'

import { DOMAIN_API } from '~/constants'
import { axiosBaseQuery } from '~/configs'
import { Profile } from '~/@types'

export const apiProfile = createApi({
  reducerPath: 'apiProfile',
  baseQuery: axiosBaseQuery({ baseUrl: `${DOMAIN_API}/api` }),
  endpoints(build) {
    return {
      getProfile: build.query<Profile, void>({
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

export const { useGetProfileQuery, usePostAvatarMutation } = apiProfile
