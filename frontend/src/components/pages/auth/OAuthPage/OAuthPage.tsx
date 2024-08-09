import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axiosInstance from '~/apis/axiosInstance'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/constants'
import { authAction } from '~/redux/reducers/auth.reducers'
import { setStore } from '~/utils'

const OAuthPage = () => {
  let { token } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    ;(async () => {
      const response = await axiosInstance.post('/auth/refresh-token', { refreshToken: token })
      const { accessToken, refreshToken } = response.data

      if (accessToken) {
        // Set the new tokens in local storage and cookies
        setStore(ACCESS_TOKEN, accessToken)
        Cookies.set(REFRESH_TOKEN, refreshToken)
        dispatch(authAction(true))
        navigate('/dashboard')
      } else {
        navigate('/login')
      }
    })()
    return () => {}
  }, [])

  return <div>Loading...</div>
}

export default OAuthPage
