"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const env_config_1 = require("~/config/env.config");
const Error_1 = require("~/models/Error");
const jwt_1 = require("~/utils/jwt");
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED, message: 'Please try login again!' });
    }
    const decode = (await (0, jwt_1.verifyToken)({ token: token, privateKey: env_config_1.env.jwt.accessTokenKey }));
    const { userId } = decode;
    req.body.userId = userId;
    return next();
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middlewares.js.map