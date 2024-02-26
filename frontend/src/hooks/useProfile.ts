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
  const { data } = useGetProfileQuery()

  const updateProfile = (profile: ProfileType) => {
    setProfile(profile)
  }

  useEffect(() => {
    if (data) {
      setProfile(data)
    }
  }, [data])

  return { profile, updateProfile }
}
