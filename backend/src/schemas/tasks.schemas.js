"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTaskSchema = exports.taskSchema = void 0;
const tslib_1 = require("tslib");
const zod_1 = tslib_1.__importDefault(require("zod"));
const enums_1 = require("~/constants/enums");
const messages_1 = require("~/constants/messages");
exports.taskSchema = zod_1.default.object({
    name: zod_1.default.string({ required_error: messages_1.VALIDATION_MESSAGES.TASK.NAME_REQUIRED, invalid_type_error: messages_1.VALIDATION_MESSAGES.TASK.NAME_LENGTH_ERROR }).min(5).max(125),
    description: zod_1.default.string({ invalid_type_error: messages_1.VALIDATION_MESSAGES.TASK.DESCRIPTION_LENGTH_ERROR }).min(5).max(255).optional(),
    priority: zod_1.default.enum([enums_1.TaskPriority.LESS_IMPORTANT, enums_1.TaskPriority.IMPORTANT, enums_1.TaskPriority.VERY_IMPORTANT], {
        invalid_type_error: messages_1.VALIDATION_MESSAGES.TASK.INVALID_PRIORITY
    }),
    dueDate: zod_1.default.string({ required_error: messages_1.VALIDATION_MESSAGES.TASK.DUE_DATE_REQUIRED }).datetime({ message: messages_1.VALIDATION_MESSAGES.TASK.INVALID_DATE }),
    status: zod_1.default
        .enum([enums_1.TaskStatus.PENDING, enums_1.TaskStatus.IN_PROGRESS, enums_1.TaskStatus.COMPLETED], {
        invalid_type_error: messages_1.VALIDATION_MESSAGES.TASK.INVALID_PRIORITY
    })
        .optional()
});
exports.editTaskSchema = zod_1.default.object({
    name: zod_1.default.string({ invalid_type_error: messages_1.VALIDATION_MESSAGES.TASK.NAME_LENGTH_ERROR }).min(5).max(125).optional(),
    description: zod_1.default.string({ invalid_type_error: messages_1.VALIDATION_MESSAGES.TASK.DESCRIPTION_LENGTH_ERROR }).min(5).max(255).optional(),
    priority: zod_1.default
        .enum([enums_1.TaskPriority.LESS_IMPORTANT, enums_1.TaskPriority.IMPORTANT, enums_1.TaskPriority.VERY_IMPORTANT], {
        invalid_type_error: messages_1.VALIDATION_MESSAGES.TASK.INVALID_PRIORITY
    })
        .optional(),
    dueDate: zod_1.default.string({ required_error: messages_1.VALIDATION_MESSAGES.TASK.DUE_DATE_REQUIRED }).datetime({ message: messages_1.VALIDATION_MESSAGES.TASK.INVALID_DATE }).optional(),
    status: zod_1.default
        .enum([enums_1.TaskStatus.PENDING, enums_1.TaskStatus.IN_PROGRESS, enums_1.TaskStatus.COMPLETED], {
        invalid_type_error: messages_1.VALIDATION_MESSAGES.TASK.INVALID_PRIORITY
    })
        .optional(),
    startDate: zod_1.default.string({ required_error: messages_1.VALIDATION_MESSAGES.TASK.DUE_DATE_REQUIRED }).datetime({ message: messages_1.VALIDATION_MESSAGES.TASK.INVALID_DATE }).optional()
});
//# sourceMappingURL=tasks.schemas.js.map