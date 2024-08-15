import { useEffect, useState } from 'react'

import { Profile } from '~/@types'
import { useGetProfileQuery } from '~/apis'

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile>({
    avatar: '',
    userId: '',
    dateOfBirth: null,
    email: '',
    fullName: '',
    bio: ''
  })
  const { data, isFetching } = useGetProfileQuery()

  const updateProfile = (profile: Profile) => {
    setProfile(profile)
  }

  useEffect(() => {
    if (data) {
      setProfile(data)
    }
  }, [data, isFetching])

  return { profile, updateProfile }
}
