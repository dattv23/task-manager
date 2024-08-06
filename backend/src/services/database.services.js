"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseService = void 0;
const mongodb_1 = require("mongodb");
const env_config_1 = require("~/config/env.config");
const messages_1 = require("~/constants/messages");
class DatabaseService {
    client;
    db;
    constructor() {
        this.client = new mongodb_1.MongoClient(env_config_1.env.database.url, {
            serverApi: {
                version: mongodb_1.ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
        });
        this.db = this.client.db(env_config_1.env.database.name);
    }
    async connect() {
        try {
            await this.db.command({ ping: 1 });
            console.log(messages_1.DATABASE_MESSAGE.CONNECT);
        }
        catch (error) {
            console.log(`⛔️ Unable to Connect MongoDB: ${error}`);
        }
    }
    async disConnect() {
        try {
            await this.client.close();
            console.log(messages_1.DATABASE_MESSAGE.DISCONNECT);
        }
        catch (error) {
            console.log(`⛔️ Unable to Connect MongoDB: ${error}`);
        }
    }
    get users() {
        return this.db.collection('users');
    }
    get otps() {
        return this.db.collection('otps');
    }
    get refreshTokens() {
        return this.db.collection('refresh-tokens');
    }
    get tasks() {
        return this.db.collection('tasks');
    }
}
exports.databaseService = new DatabaseService();
//# sourceMappingURL=database.services.js.map