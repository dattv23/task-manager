import axios from 'axios'
import { BASE_URL } from './endpoint'

export const TIME_OUT = 15000

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  }
})

export default instance
