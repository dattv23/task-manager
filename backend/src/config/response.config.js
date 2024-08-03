"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
const http_status_codes_1 = require("http-status-codes");
exports.sendResponse = {
    success: (response, data, message) => {
        response.status(http_status_codes_1.StatusCodes.OK).json({
            statusCode: http_status_codes_1.StatusCodes.OK,
            data: data,
            message: message,
            dataTime: (0, moment_1.default)(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
        });
    },
    created: (response, data, message) => {
        response.status(http_status_codes_1.StatusCodes.CREATED).json({
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            data: data,
            message: message,
            dataTime: (0, moment_1.default)(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
        });
    },
    noContent: (response, data, message) => {
        response.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({
            statusCode: http_status_codes_1.StatusCodes.NO_CONTENT,
            data: data,
            message: message,
            dataTime: (0, moment_1.default)(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
        });
    },
    badRequest: (response, data, message) => {
        response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
            data: data,
            message: message,
            dataTime: (0, moment_1.default)(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
        });
    },
    unauthorized: (response, data, message) => {
        response.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
            statusCode: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            data: data,
            message: message,
            dataTime: (0, moment_1.default)(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
        });
    },
    validation: (response, errors, message) => {
        response.status(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY).json({
            statusCode: http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY,
            errors: errors,
            message: message,
            dataTime: (0, moment_1.default)(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
        });
    },
    forbidden: (response, message) => {
        response.status(http_status_codes_1.StatusCodes.FORBIDDEN).json({
            statusCode: http_status_codes_1.StatusCodes.FORBIDDEN,
            message: message,
            dataTime: (0, moment_1.default)(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
        });
    },
    notFound: (response, data, message) => {
        response.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
            statusCode: http_status_codes_1.StatusCodes.NOT_FOUND,
            data: data,
            message: message,
            dataTime: (0, moment_1.default)(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
        });
    },
    conflict: (response, message) => {
        response.status(http_status_codes_1.StatusCodes.CONFLICT).json({
            statusCode: http_status_codes_1.StatusCodes.CONFLICT,
            message: message,
            dataTime: (0, moment_1.default)(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
        });
    },
    error: (response, message) => {
        response.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            message: message,
            dataTime: (0, moment_1.default)(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
        });
    }
};
//# sourceMappingURL=response.config.js.map