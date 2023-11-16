/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from 'crypto-js'
import { env } from '../config/environment'

export default function hashData(data: any): string {
  const hashedData = CryptoJS.HmacSHA256(data, `${env.SECRET_KEY}`).toString()
  return hashedData
}
