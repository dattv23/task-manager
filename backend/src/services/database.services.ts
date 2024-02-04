import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/env.config'
import { DATABASE_MESSAGE } from '~/constants/messages'
import User from '~/models/database/User'

class DatabaseService {
  private client: MongoClient
  private db: Db

  constructor() {
    this.client = new MongoClient(env.database.url!, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.db = this.client.db(env.database.name)
  }

  async connect() {
    try {
      await this.db.command({ ping: 1 })
      console.log(DATABASE_MESSAGE.CONNECT)
    } catch (error) {
      console.log(`⛔️ Unable to Connect MongoDB: ${error}`)
    }
  }

  async disConnect() {
    try {
      await this.client.close()
      console.log(DATABASE_MESSAGE.DISCONNECT)
    } catch (error) {
      console.log(`⛔️ Unable to Connect MongoDB: ${error}`)
    }
  }

  public get users(): Collection<User> {
    return this.db.collection('users')
  }
}

export const databaseService = new DatabaseService()
