"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = void 0;
const tslib_1 = require("tslib");
const http_status_codes_1 = require("http-status-codes");
const multer_1 = tslib_1.__importDefault(require("multer"));
const Error_1 = require("~/models/Error");
const file_1 = require("~/utils/file");
exports.uploadMiddleware = {
    singleImage: (req, res, next) => {
        const id = req.body.userId;
        file_1.uploadImage.single('image')(req, res, (err) => {
            if (err instanceof multer_1.default.MulterError) {
                next(new Error_1.ErrorWithStatus({
                    statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                    message: err.message
                }));
            }
            if (err instanceof Error) {
                next(new Error_1.ErrorWithStatus({
                    statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                    message: err.message
                }));
            }
            req.body.userId = id;
            next();
        });
    }
};
//# sourceMappingURL=upload.middlewares.js.map