// dbConnect.ts
import { MongoClient, Db } from 'mongodb';

class MongoConnection {
      private static instance: MongoConnection;
      private client!: MongoClient;
      private db!: Db;

      private constructor() {
            // Private constructor to prevent instantiation outside the class
      }

      public static getInstance(): MongoConnection {
            if (!MongoConnection.instance) {
                  MongoConnection.instance = new MongoConnection();
            }
            return MongoConnection.instance;
      }

      public async connect(): Promise<Db> {
            if (this.db) {
                  return this.db;
            }

            try {
                  this.client = await MongoClient.connect(`${process.env.MONGO_URI}`);
                  this.db = this.client.db("task-manager");
                  // Ensure the connection closes when Node exits
                  process.on('exit', () => {
                        this.client.close();
                  });

                  return this.db;
            } catch (error) {
                  console.error('Error connecting to the MongoDB URL: ' + `${process.env.MONGO_URI}`);
                  throw error;
            }
      }

      // Additional method to expose MongoClient for direct use if needed
      public getClient(): MongoClient {
            return this.client;
      }
}

// Expose the connect method
export const connectToMongoDB = async (): Promise<Db> => {
      const mongoConnection = MongoConnection.getInstance();
      return mongoConnection.connect();
};

// Expose the getClient method
export const getClient = (): MongoClient => {
      const mongoConnection = MongoConnection.getInstance();
      return mongoConnection.getClient();
};
