// userService.ts
import { ObjectId, Collection, MongoClient } from 'mongodb';
import { getClient } from '../database/dbConnect';
import { IUser } from '../types/user.types';

class UserService {
      private client: MongoClient;
      private collection: Collection<IUser>;

      constructor(client: MongoClient, collection: Collection<IUser>) {
            // Accept MongoClient and Collection as constructor parameters
            this.client = client;
            this.collection = collection;
      }

      async createUserDocument(user: IUser) {
            await this.collection.insertOne(user);
      }

      async updateUserDocument(userId: ObjectId, updatedFields: Partial<IUser>) {
            await this.collection.updateOne({ _id: userId }, { $set: updatedFields });
      }
}

const client = getClient();
const db = client.db('task-manager');
const collection = db.collection<IUser>('users');

const userService = new UserService(client, collection);
export default userService;
