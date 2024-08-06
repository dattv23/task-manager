"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_config_1 = require("~/config/env.config");
const enums_1 = require("~/constants/enums");
const jwt_1 = require("~/utils/jwt");
class TokenServices {
    signAccessToken(userId, role) {
        const { accessTokenKey, accessTokenEXP, jwtAlgorithm } = env_config_1.env.jwt;
        const payload = {
            userId,
            role,
            tokenType: enums_1.TokenType.AccessToken
        };
        const options = {
            expiresIn: accessTokenEXP,
            algorithm: jwtAlgorithm
        };
        return (0, jwt_1.signToken)({ payload, privateKey: accessTokenKey, options });
    }
    signRefreshToken(userId, role) {
        const { refreshTokenKey, refreshTokenEXP, jwtAlgorithm } = env_config_1.env.jwt;
        const payload = {
            userId,
            role,
            tokenType: enums_1.TokenType.RefreshToken
        };
        const options = {
            expiresIn: refreshTokenEXP,
            algorithm: jwtAlgorithm
        };
        return (0, jwt_1.signToken)({ payload, privateKey: refreshTokenKey, options });
    }
    signAccessAndRefreshToken(userId, role) {
        return Promise.all([this.signAccessToken(userId, role), this.signRefreshToken(userId, role)]);
    }
}
const tokenServices = new TokenServices();
exports.default = tokenServices;
//# sourceMappingURL=token.services.js.map