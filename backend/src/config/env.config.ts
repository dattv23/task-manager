import dotenv from 'dotenv'

dotenv.config()

export const env = {
  node_env: process.env.NODE_ENV,
  server: {
    port: process.env.APP_PORT || 5000,
    host: process.env.APP_HOST,
    secret: process.env.APP_SECRET
  },
  database: {
    url: process.env.DB_URL,
    name: process.env.DB_NAME
  },
  jwt: {
    accessTokenKey: process.env.ACCESS_TOKEN_KEY,
    refreshTokenKey: process.env.REFRESH_TOKEN_KEY,
    accessTokenEXP: process.env.ACCESS_TOKEN_EXPIRED,
    refreshTokenEXP: process.env.REFRESH_TOKEN_EXPIRED,
    jwtAlgorithm: process.env.JWT_ALGORITHM
  }
}