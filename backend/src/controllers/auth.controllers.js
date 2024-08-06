"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const tslib_1 = require("tslib");
const openid_client_1 = require("openid-client");
const response_config_1 = require("~/config/response.config");
const messages_1 = require("~/constants/messages");
const auth_services_1 = tslib_1.__importDefault(require("~/services/auth.services"));
const openidClient_services_1 = tslib_1.__importDefault(require("~/services/openidClient.services"));
const users_services_1 = tslib_1.__importDefault(require("~/services/users.services"));
exports.authController = {
    register: async (req, res, next) => {
        const result = await auth_services_1.default.register(req.body);
        return response_config_1.sendResponse.created(res, result, messages_1.RESULT_RESPONSE_MESSAGES.AUTH.REGISTER.IS_SUCCESS);
    },
    verifyOTP: async (req, res, next) => {
        await auth_services_1.default.verifyOTP(req.body);
        return response_config_1.sendResponse.success(res, {}, messages_1.RESULT_RESPONSE_MESSAGES.AUTH.VERIFY_OTP.IS_SUCCESS);
    },
    resendOTP: async (req, res, next) => {
        await auth_services_1.default.resendOTP(req.body);
        return response_config_1.sendResponse.success(res, {}, messages_1.RESULT_RESPONSE_MESSAGES.AUTH.RESEND_OTP.IS_SUCCESS);
    },
    resetPassword: async (req, res, next) => {
        await auth_services_1.default.resetPassword(req.body);
        return response_config_1.sendResponse.success(res, {}, messages_1.RESULT_RESPONSE_MESSAGES.AUTH.RESET_PASSWORD.IS_SUCCESS);
    },
    login: async (req, res, next) => {
        const result = await auth_services_1.default.login(req.body);
        return response_config_1.sendResponse.success(res, result, messages_1.RESULT_RESPONSE_MESSAGES.AUTH.LOGIN.IS_SUCCESS);
    },
    refreshToken: async (req, res, next) => {
        const result = await auth_services_1.default.newToken(req.body);
        return response_config_1.sendResponse.created(res, result, messages_1.RESULT_RESPONSE_MESSAGES.AUTH.NEW_TOKEN.IS_SUCCESS);
    },
    auth: async (req, res) => {
        try {
            const client = await openidClient_services_1.default.getClient();
            const code_verifier = openid_client_1.generators.codeVerifier();
            req.session.code_verifier = code_verifier;
            const code_challenge = openid_client_1.generators.codeChallenge(code_verifier);
            const authUrl = client.authorizationUrl({
                scope: 'openid email profile',
                code_challenge,
                code_challenge_method: 'S256'
            });
            res.redirect(authUrl);
        }
        catch (error) {
            console.error('Error during auth initiation:', error);
            res.status(500).json({ error: 'Internal server error during auth initiation.' });
        }
    },
    callback: async (req, res) => {
        const client = await openidClient_services_1.default.getClient();
        const params = client.callbackParams(req);
        const { code_verifier } = req.session;
        if (!code_verifier) {
            return res.status(400).json({ error: 'Code verifier missing in request.' });
        }
        try {
            const tokenSet = await client.callback('http://localhost:8080/api/auth/callback', params, {
                code_verifier: code_verifier
            });
            const userinfo = await client.userinfo(tokenSet);
            const { email, birthdate, name, picture } = userinfo;
            const { refreshToken } = await users_services_1.default.createUser({ email: email, password: email, dateOfBirth: new Date(birthdate), fullName: name, avatar: picture });
            res.redirect(`http://localhost:3000/oauth/${refreshToken}`);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
//# sourceMappingURL=auth.controllers.js.map