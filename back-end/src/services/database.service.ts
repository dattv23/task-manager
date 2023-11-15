import { Db, MongoClient } from 'mongodb'
import { env } from '../config/environment'

let database: Db

// create client to connect mongodb
const client: MongoClient = new MongoClient(`${env.DB_URI}`)

class DatabaseServices {
  async connectDB() {
    await client.connect()

    database = client.db(env.DB_NAME)
  }

  getDB() {
    if (!database) {
      throw new Error('Must connect to Database first!')
    }
    return database
  }

  async getCollection(name: string) {
    const db = this.getDB()
    return db.collection(name)
  }

  async closeDB() {
    await client.close()
  }
}

const databaseServices = new DatabaseServices()
export { databaseServices }