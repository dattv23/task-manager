"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenSchema = exports.loginSchema = exports.resetPasswordSchema = exports.resendOTPSchema = exports.verifyOTPSchema = exports.userRegistrationSchema = void 0;
const zod_1 = require("zod");
const messages_1 = require("~/constants/messages");
const database_services_1 = require("~/services/database.services");
const helpers_1 = require("~/utils/helpers");
exports.userRegistrationSchema = zod_1.z.object({
    fullName: zod_1.z.string({
        required_error: messages_1.VALIDATION_MESSAGES.AUTH.FULL_NAME_IS_REQUIRED,
        invalid_type_error: messages_1.VALIDATION_MESSAGES.AUTH.FULL_NAME_MUST_BE_STRING
    }),
    email: zod_1.z
        .string({
        required_error: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_IS_REQUIRED,
        invalid_type_error: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_MUST_BE_STRING
    })
        .email({ message: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_INVALID })
        .refine(async (email) => {
        const user = await database_services_1.databaseService.users.findOne({ email: email });
        if (user)
            return false;
        return true;
    }, { message: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_ACCESSIBILITY }),
    password: zod_1.z
        .string({
        required_error: messages_1.VALIDATION_MESSAGES.AUTH.PASSWORD_IS_REQUIRED,
        invalid_type_error: messages_1.VALIDATION_MESSAGES.AUTH.PASSWORD_MUST_BE_STRING
    })
        .regex(helpers_1.regexPassword, { message: messages_1.VALIDATION_MESSAGES.AUTH.PASSWORD_INVALID })
});
exports.verifyOTPSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_IS_REQUIRED,
        invalid_type_error: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_MUST_BE_STRING
    })
        .email({ message: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_INVALID })
        .refine(async (email) => {
        const user = await database_services_1.databaseService.users.findOne({ email });
        if (!user)
            return false;
        return true;
    }, { message: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_NOT_EXIST }),
    code: zod_1.z
        .string({
        required_error: messages_1.VALIDATION_MESSAGES.AUTH.OTP.IS_REQUIRED
    })
        .regex(helpers_1.regexOTP, { message: messages_1.VALIDATION_MESSAGES.AUTH.OTP.IS_INVALID })
});
exports.resendOTPSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_IS_REQUIRED,
        invalid_type_error: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_MUST_BE_STRING
    })
        .email({ message: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_INVALID })
});
exports.resetPasswordSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_IS_REQUIRED,
        invalid_type_error: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_MUST_BE_STRING
    })
        .email({ message: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_INVALID }),
    password: zod_1.z
        .string({
        required_error: messages_1.VALIDATION_MESSAGES.AUTH.PASSWORD_IS_REQUIRED,
        invalid_type_error: messages_1.VALIDATION_MESSAGES.AUTH.PASSWORD_MUST_BE_STRING
    })
        .regex(helpers_1.regexPassword, { message: messages_1.VALIDATION_MESSAGES.AUTH.PASSWORD_INVALID })
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z
        .string({
        required_error: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_IS_REQUIRED,
        invalid_type_error: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_MUST_BE_STRING
    })
        .email({ message: messages_1.VALIDATION_MESSAGES.AUTH.EMAIL_INVALID }),
    password: zod_1.z
        .string({
        required_error: messages_1.VALIDATION_MESSAGES.AUTH.PASSWORD_IS_REQUIRED,
        invalid_type_error: messages_1.VALIDATION_MESSAGES.AUTH.PASSWORD_MUST_BE_STRING
    })
        .regex(helpers_1.regexPassword, { message: messages_1.VALIDATION_MESSAGES.AUTH.PASSWORD_INVALID })
});
exports.refreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string({ required_error: messages_1.VALIDATION_MESSAGES.AUTH.REFRESH_TOKEN_IS_REQUIRED })
});
//# sourceMappingURL=auth.schemas.js.map