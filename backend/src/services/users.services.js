"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const database_services_1 = require("./database.services");
const mongodb_1 = require("mongodb");
const Error_1 = require("~/models/Error");
const http_status_codes_1 = require("http-status-codes");
const messages_1 = require("~/constants/messages");
const cloudiary_services_1 = tslib_1.__importDefault(require("./cloudiary.services"));
const database_1 = require("~/models/database");
const token_services_1 = tslib_1.__importDefault(require("./token.services"));
const enums_1 = require("~/constants/enums");
class UsersServices {
    async createUser(payload) {
        const { email } = payload;
        const user = await database_services_1.databaseService.users.findOne({ email: email });
        if (user) {
            const [accessToken, refreshToken] = await token_services_1.default.signAccessAndRefreshToken(user._id.toString(), user.role);
            return { email, fullName: user.fullName, accessToken, refreshToken };
        }
        const newUser = new database_1.User({ ...payload, role: enums_1.UserRole.User });
        const result = await database_services_1.databaseService.users.insertOne(newUser);
        const [accessToken, refreshToken] = await token_services_1.default.signAccessAndRefreshToken(result.insertedId.toString(), newUser.role);
        return { email, fullName: newUser.fullName, accessToken, refreshToken };
    }
    async getProfile(payload) {
        const { userId } = payload;
        const userResult = await database_services_1.databaseService.users.findOne({ _id: new mongodb_1.ObjectId(userId) });
        if (!userResult) {
            throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.NOT_FOUND, message: messages_1.RESULT_RESPONSE_MESSAGES.USERS.USER_NOT_EXIST });
        }
        const { _id, fullName, email, dateOfBirth, avatar, bio } = userResult;
        const content = { userId: _id.toString(), fullName, email, dateOfBirth, avatar, bio };
        return content;
    }
    async uploadAvatar(payload, file) {
        const { userId } = payload;
        const user = await database_services_1.databaseService.users.findOne({ _id: new mongodb_1.ObjectId(userId) });
        if (!user) {
            throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.NOT_FOUND, message: messages_1.RESULT_RESPONSE_MESSAGES.USERS.USER_NOT_EXIST });
        }
        const { url } = await cloudiary_services_1.default.uploadImage('avatar', file.buffer);
        if (user.avatar) {
            await cloudiary_services_1.default.deleteImage(user.avatar);
        }
        await database_services_1.databaseService.users.findOneAndUpdate({ _id: new mongodb_1.ObjectId(userId) }, { $set: { avatar: url } });
        return { url: url };
    }
}
const usersServices = new UsersServices();
exports.default = usersServices;
//# sourceMappingURL=users.services.js.map