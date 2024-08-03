"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksController = void 0;
const tslib_1 = require("tslib");
const response_config_1 = require("~/config/response.config");
const messages_1 = require("~/constants/messages");
const tasks_services_1 = tslib_1.__importDefault(require("~/services/tasks.services"));
exports.tasksController = {
    getTasks: async (req, res, next) => {
        const result = await tasks_services_1.default.getTasks(req.body);
        return response_config_1.sendResponse.success(res, result, messages_1.RESULT_RESPONSE_MESSAGES.TASKS.GET_TASKS.IS_SUCCESS);
    },
    getTaskById: async (req, res, next) => {
        const result = await tasks_services_1.default.getTaskById(req.params);
        return response_config_1.sendResponse.success(res, result, messages_1.RESULT_RESPONSE_MESSAGES.TASKS.GET_TASK_BY_ID.IS_SUCCESS);
    },
    createTask: async (req, res, next) => {
        const result = await tasks_services_1.default.createTask(req.body);
        return response_config_1.sendResponse.success(res, result, messages_1.RESULT_RESPONSE_MESSAGES.TASKS.CREATE_TASK.IS_SUCCESS);
    },
    editTask: async (req, res, next) => {
        const result = await tasks_services_1.default.editTask(req.body, req.params);
        return response_config_1.sendResponse.success(res, result, messages_1.RESULT_RESPONSE_MESSAGES.TASKS.EDIT_TASK.IS_SUCCESS);
    },
    deleteTask: async (req, res, next) => {
        await tasks_services_1.default.deleteTask(req.params);
        return response_config_1.sendResponse.success(res, [], messages_1.RESULT_RESPONSE_MESSAGES.TASKS.DELETE_TASK.IS_SUCCESS);
    }
};
//# sourceMappingURL=tasks.controllers.js.map