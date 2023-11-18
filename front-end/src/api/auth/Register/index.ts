import instance from '../../config'
import { REGISTER } from '../../endpoint'

type params = {
  name: string
  email: string
  password: string
  password_confirm: string
}

export const registerAPI = (data: params) => {
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: REGISTER,
    data: data
  }
  return instance.request(config)
}