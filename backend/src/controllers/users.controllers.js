"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersController = void 0;
const tslib_1 = require("tslib");
const response_config_1 = require("~/config/response.config");
const messages_1 = require("~/constants/messages");
const users_services_1 = tslib_1.__importDefault(require("~/services/users.services"));
exports.usersController = {
    getProfile: async (req, res, next) => {
        const result = await users_services_1.default.getProfile(req.body);
        return response_config_1.sendResponse.success(res, result, messages_1.RESULT_RESPONSE_MESSAGES.USERS.GET_PROFILE.IS_SUCCESS);
    },
    uploadAvatar: async (req, res, next) => {
        const result = await users_services_1.default.uploadAvatar(req.body, req.file);
        return response_config_1.sendResponse.success(res, result, messages_1.RESULT_RESPONSE_MESSAGES.USERS.UPLOAD_AVATAR.IS_SUCCESS);
    }
};
//# sourceMappingURL=users.controllers.js.map