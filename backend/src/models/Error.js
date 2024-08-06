"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorWithStatus = void 0;
const tslib_1 = require("tslib");
const moment_1 = tslib_1.__importDefault(require("moment"));
class ErrorWithStatus {
    statusCode;
    message;
    created_at;
    updated_at;
    constructor({ statusCode, message, created_at, updated_at }) {
        this.statusCode = statusCode;
        this.message = message;
        this.created_at = created_at || (0, moment_1.default)(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS');
        this.updated_at = updated_at || (0, moment_1.default)(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS');
    }
}
exports.ErrorWithStatus = ErrorWithStatus;
//# sourceMappingURL=Error.js.map