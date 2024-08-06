"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const User_1 = tslib_1.__importDefault(require("~/models/database/User"));
const database_services_1 = require("./database.services");
const crypto_1 = require("~/utils/crypto");
const OTP_1 = tslib_1.__importDefault(require("~/models/database/OTP"));
const email_1 = require("~/utils/email");
const Error_1 = require("~/models/Error");
const http_status_codes_1 = require("http-status-codes");
const messages_1 = require("~/constants/messages");
const token_services_1 = tslib_1.__importDefault(require("./token.services"));
const enums_1 = require("~/constants/enums");
const jwt_1 = require("~/utils/jwt");
const env_config_1 = require("~/config/env.config");
const database_1 = require("~/models/database");
const mongodb_1 = require("mongodb");
class AuthServices {
    async register(payload) {
        const { fullName, email, password } = payload;
        const hashedPassword = (0, crypto_1.hashText)(password);
        const newUser = new User_1.default({
            ...payload,
            password: hashedPassword
        });
        const userResult = await database_services_1.databaseService.users.insertOne(newUser);
        const otp = await (0, email_1.sendOTP)(email);
        const newOTP = new OTP_1.default({
            code: (0, crypto_1.hashText)(otp),
            email: email
        });
        await database_services_1.databaseService.otps.insertOne(newOTP);
        const userId = userResult.insertedId.toString();
        const content = { userId, fullName, email };
        return content;
    }
    async verifyOTP(payload) {
        const { email, code } = payload;
        const otp = await database_services_1.databaseService.otps.findOne({ email });
        if (!otp) {
            throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.NOT_FOUND, message: messages_1.RESULT_RESPONSE_MESSAGES.AUTH.VERIFY_OTP.IS_EXPIRED });
        }
        if ((0, crypto_1.hashText)(code) !== otp?.code) {
            throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.NOT_FOUND, message: messages_1.RESULT_RESPONSE_MESSAGES.AUTH.VERIFY_OTP.IS_INCORRECT });
        }
        await database_services_1.databaseService.users.findOneAndUpdate({ email }, { $set: { verify: enums_1.UserVerifyStatus.Verified } });
        return true;
    }
    async resendOTP(payload) {
        const { email } = payload;
        const user = await database_services_1.databaseService.users.findOne({ email });
        if (!user) {
            throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.NOT_FOUND, message: messages_1.RESULT_RESPONSE_MESSAGES.AUTH.RESEND_OTP.EMAIL_NOT_EXIST });
        }
        const otp = await (0, email_1.sendOTP)(email);
        const newOTP = new OTP_1.default({
            code: (0, crypto_1.hashText)(otp),
            email: email
        });
        await database_services_1.databaseService.otps.findOneAndDelete({ email });
        await database_services_1.databaseService.otps.insertOne(newOTP);
        return true;
    }
    async resetPassword(payload) {
        const { email, password } = payload;
        const user = await database_services_1.databaseService.users.findOneAndUpdate({ email }, { $set: { password: (0, crypto_1.hashText)(password) } });
        if (!user) {
            throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.NOT_FOUND, message: messages_1.RESULT_RESPONSE_MESSAGES.AUTH.RESET_PASSWORD.EMAIL_NOT_EXIST });
        }
        return true;
    }
    async login(payload) {
        const { email, password } = payload;
        const user = await database_services_1.databaseService.users.findOne({ email });
        if (!user) {
            throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.NOT_FOUND, message: messages_1.RESULT_RESPONSE_MESSAGES.AUTH.LOGIN.EMAIL_NOT_EXIST });
        }
        if (user.password !== (0, crypto_1.hashText)(password)) {
            throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST, message: messages_1.RESULT_RESPONSE_MESSAGES.AUTH.LOGIN.PASSWORD_INCORRECT });
        }
        if (user.verify === enums_1.UserVerifyStatus.Unverified) {
            throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.FORBIDDEN, message: messages_1.RESULT_RESPONSE_MESSAGES.AUTH.LOGIN.ACCOUNT_UNVERIFIED });
        }
        const { _id, fullName, role } = user;
        const [accessToken, refreshToken] = await token_services_1.default.signAccessAndRefreshToken(_id.toString(), role);
        await database_services_1.databaseService.refreshTokens.deleteOne({ userId: _id });
        await database_services_1.databaseService.refreshTokens.insertOne(new database_1.RefreshToken({
            token: refreshToken,
            userId: _id
        }));
        const content = { userId: _id.toString(), email, fullName, accessToken, refreshToken };
        return content;
    }
    async newToken(payload) {
        const { refreshToken } = payload;
        const { refreshTokenKey } = env_config_1.env.jwt;
        const { userId, role } = (await (0, jwt_1.verifyToken)({ token: refreshToken, privateKey: refreshTokenKey }));
        const token = await database_services_1.databaseService.refreshTokens.deleteOne({ token: refreshToken });
        if (!token) {
            throw new Error_1.ErrorWithStatus({
                statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
                message: messages_1.RESULT_RESPONSE_MESSAGES.AUTH.NEW_TOKEN.REFRESH_TOKEN_EXPIRED
            });
        }
        const [newAccessToken, newRefreshToken] = await token_services_1.default.signAccessAndRefreshToken(userId, role);
        await database_services_1.databaseService.refreshTokens.insertOne(new database_1.RefreshToken({ token: newRefreshToken, userId: new mongodb_1.ObjectId(userId) }));
        const content = { accessToken: newAccessToken, refreshToken: newRefreshToken };
        return content;
    }
}
const authServices = new AuthServices();
exports.default = authServices;
//# sourceMappingURL=auth.services.js.map