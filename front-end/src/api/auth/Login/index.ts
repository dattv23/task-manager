import instance from '../../config'
import { LOGIN } from '../../endpoint'

type params = {
  email: string
  password: string
}

export const loginAPI = (data: params) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: LOGIN,
    data: data
  }
  return instance.request(config)
}