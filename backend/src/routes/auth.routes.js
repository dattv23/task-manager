"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_controllers_1 = require("~/controllers/auth.controllers");
const validation_middlewares_1 = tslib_1.__importDefault(require("~/middlewares/validation.middlewares"));
const auth_schemas_1 = require("~/schemas/auth.schemas");
const handler_1 = require("~/utils/handler");
const authRouter = (0, express_1.Router)();
authRouter.post('/register', (0, validation_middlewares_1.default)(auth_schemas_1.userRegistrationSchema), (0, handler_1.wrapRequestHandler)(auth_controllers_1.authController.register));
authRouter.post('/verify-otp', (0, validation_middlewares_1.default)(auth_schemas_1.verifyOTPSchema), (0, handler_1.wrapRequestHandler)(auth_controllers_1.authController.verifyOTP));
authRouter.post('/resend-otp', (0, validation_middlewares_1.default)(auth_schemas_1.resendOTPSchema), (0, handler_1.wrapRequestHandler)(auth_controllers_1.authController.resendOTP));
authRouter.post('/reset-password', (0, validation_middlewares_1.default)(auth_schemas_1.resetPasswordSchema), (0, handler_1.wrapRequestHandler)(auth_controllers_1.authController.resetPassword));
authRouter.post('/login', (0, validation_middlewares_1.default)(auth_schemas_1.loginSchema), (0, handler_1.wrapRequestHandler)(auth_controllers_1.authController.login));
authRouter.post('/refresh-token', (0, validation_middlewares_1.default)(auth_schemas_1.refreshTokenSchema), (0, handler_1.wrapRequestHandler)(auth_controllers_1.authController.refreshToken));
authRouter.get('/google', (0, handler_1.wrapRequestHandler)(auth_controllers_1.authController.auth));
authRouter.get('/callback', (0, handler_1.wrapRequestHandler)(auth_controllers_1.authController.callback));
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map