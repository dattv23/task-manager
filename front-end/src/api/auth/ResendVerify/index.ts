import instance from '../../config'
import { RESEND_VERIFY_USER } from '../../endpoint'

type params = {
  email: string
}

export const resendVerifyAPI = (data: params) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: RESEND_VERIFY_USER,
    data: data
  }
  return instance.request(config)
}