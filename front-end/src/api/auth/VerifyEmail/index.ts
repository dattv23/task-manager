import instance from '../../config'
import { VERIFY_USER } from '../../endpoint'

type params = {
  email: string
  code: string
}

export const verifyEmailAPI = (data: params) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: VERIFY_USER,
    data: data
  }
  return instance.request(config)
}