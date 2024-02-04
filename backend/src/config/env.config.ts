import dotenv from 'dotenv'

dotenv.config()

export const env = {
  node_env: process.env.NODE_ENV,
  server: {
    port: process.env.APP_PORT || 5000,
    host: process.env.APP_HOST
  },
  database: {
    url: process.env.DB_URL,
    name: process.env.DB_NAME
  }
}
