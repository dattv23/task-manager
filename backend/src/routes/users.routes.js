"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controllers_1 = require("~/controllers/users.controllers");
const auth_middlewares_1 = require("~/middlewares/auth.middlewares");
const upload_middlewares_1 = require("~/middlewares/upload.middlewares");
const handler_1 = require("~/utils/handler");
const usersRouter = (0, express_1.Router)();
usersRouter.get('/@me/profile', (0, handler_1.wrapRequestHandler)(auth_middlewares_1.authMiddleware), (0, handler_1.wrapRequestHandler)(users_controllers_1.usersController.getProfile));
usersRouter.put('/@me/avatar', (0, handler_1.wrapRequestHandler)(auth_middlewares_1.authMiddleware), (0, handler_1.wrapRequestHandler)(upload_middlewares_1.uploadMiddleware.singleImage), (0, handler_1.wrapRequestHandler)(users_controllers_1.usersController.uploadAvatar));
exports.default = usersRouter;
//# sourceMappingURL=users.routes.js.map