import { useEffect, useState } from 'react'
import { ProfileType } from '~/@types/response.type'
import { useGetProfileQuery } from '~/apis/api'

export const useProfile = () => {
  const [profile, setProfile] = useState<ProfileType>({
    avatar: '',
    userId: '',
    dateOfBirth: null,
    email: '',
    fullName: '',
    bio: ''
  })
  const { data, isFetching } = useGetProfileQuery()

  const updateProfile = (profile: ProfileType) => {
    setProfile(profile)
  }

  useEffect(() => {
    if (data) {
      setProfile(data)
    }
  }, [data, isFetching])

  return { profile, updateProfile }
}
