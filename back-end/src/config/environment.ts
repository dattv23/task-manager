import dotenv from 'dotenv'
import { toNumber } from 'lodash'

dotenv.config()

export const env = {
  DB_URI: process.env.DB_URI,
  DB_NAME: process.env.DB_NAME,
  SECRET_KEY: process.env.SECRET_KEY,
  EMAIL: process.env.EMAIL,
  PASS_EMAIL: process.env.PASS_EMAIL,
  OTP_EXPIRY_TIME: toNumber(process.env.OTP_EXPIRY_TIME),
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY_TIME: toNumber(process.env.ACCESS_TOKEN_EXPIRY_TIME),
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY_TIME: toNumber(process.env.REFRESH_TOKEN_EXPIRY_TIME),
  PORT: toNumber(process.env.PORT)
}
