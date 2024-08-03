"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const lodash_1 = require("lodash");
const http_status_codes_1 = require("http-status-codes");
const Error_1 = require("~/models/Error");
const zod_1 = require("zod");
const response_config_1 = require("~/config/response.config");
const messages_1 = require("~/constants/messages");
const jsonwebtoken_1 = require("jsonwebtoken");
const errorHandler = (err, req, res, next) => {
    try {
        if (err instanceof Error_1.ErrorWithStatus) {
            return res.status(err.statusCode).json((0, lodash_1.omit)(err, ['statusCode']));
        }
        if (err instanceof zod_1.ZodError) {
            const errorMessages = err.errors.map((issue) => ({
                path: issue.path[0],
                message: issue.message
            }));
            return response_config_1.sendResponse.validation(res, errorMessages, messages_1.VALIDATION_MESSAGES.TITLE);
        }
        if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
            return response_config_1.sendResponse.unauthorized(res, {}, err.message);
        }
        // Print out stacktrace to find bug easier
        console.error(err);
        const finalError = {};
        Object.getOwnPropertyNames(err).forEach((key) => {
            if (!Object.getOwnPropertyDescriptor(err, key)?.configurable || !Object.getOwnPropertyDescriptor(err, key)?.writable) {
                return;
            }
            finalError[key] = err[key];
        });
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: finalError.message,
            errorInfo: (0, lodash_1.omit)(finalError, ['stack'])
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Internal server error',
            errorInfo: (0, lodash_1.omit)(error, ['stack'])
        });
    }
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.middlewares.js.map