import dotenv from 'dotenv'

dotenv.config()

export const env = {
  node_env: process.env.NODE_ENV,
  server: {
    protocol: process.env.SERVER_PROTOCOL,
    host: process.env.APP_HOST,
    port: process.env.APP_PORT || 5000,
    secret: process.env.APP_SECRET,
    domainFE: process.env.DOMAIN_FE
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
  },
  email: {
    address: process.env.EMAIL,
    password: process.env.PASS_EMAIL
  },
  cloudinary: {
    name: process.env.CLOUDINARY_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
    url: process.env.CLOUDINARY_URL
  },
  auth: {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET
  }
}
