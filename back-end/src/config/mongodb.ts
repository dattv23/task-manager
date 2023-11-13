import { Db, MongoClient } from 'mongodb'
import { env } from './environment'

let database: Db

// create client to connect mongodb
const client: MongoClient = new MongoClient(`${env.DB_URI}`)

export const connectDB = async () => {
  await client.connect()

  database = client.db(env.DB_NAME)
}

export const getDB = () => {
  if (!database) {
    throw new Error('Must connect to Database first!')
  }
  return database
}

export const closeDB = async () => {
  await client.close()
}
