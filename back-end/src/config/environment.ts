import dotenv from 'dotenv'

dotenv.config()

export const env = {
  DB_URI: process.env.DB_URI,
  DB_NAME: process.env.DB_NAME,
  SECRET_KEY: process.env.DB_NAME,
  EMAIL: process.env.DB_NAME,
  PASS_EMAIL: process.env.DB_NAME,
  ACCESS_TOKEN_SECRET: process.env.DB_NAME,
  REFRESH_TOKEN_SECRET: process.env.DB_NAME,
  PORT: process.env.PORT
}