"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const tasks_controllers_1 = require("~/controllers/tasks.controllers");
const auth_middlewares_1 = require("~/middlewares/auth.middlewares");
const validation_middlewares_1 = tslib_1.__importDefault(require("~/middlewares/validation.middlewares"));
const tasks_schemas_1 = require("~/schemas/tasks.schemas");
const handler_1 = require("~/utils/handler");
const tasksRouter = (0, express_1.Router)();
tasksRouter.get('/', (0, handler_1.wrapRequestHandler)(auth_middlewares_1.authMiddleware), (0, handler_1.wrapRequestHandler)(tasks_controllers_1.tasksController.getTasks));
tasksRouter.get('/:id', (0, handler_1.wrapRequestHandler)(auth_middlewares_1.authMiddleware), (0, handler_1.wrapRequestHandler)(tasks_controllers_1.tasksController.getTaskById));
tasksRouter.post('/', (0, handler_1.wrapRequestHandler)(auth_middlewares_1.authMiddleware), (0, validation_middlewares_1.default)(tasks_schemas_1.taskSchema), (0, handler_1.wrapRequestHandler)(tasks_controllers_1.tasksController.createTask));
tasksRouter.put('/:id', (0, handler_1.wrapRequestHandler)(auth_middlewares_1.authMiddleware), (0, validation_middlewares_1.default)(tasks_schemas_1.editTaskSchema), (0, handler_1.wrapRequestHandler)(tasks_controllers_1.tasksController.editTask));
tasksRouter.delete('/:id', (0, handler_1.wrapRequestHandler)(auth_middlewares_1.authMiddleware), (0, handler_1.wrapRequestHandler)(tasks_controllers_1.tasksController.deleteTask));
exports.default = tasksRouter;
//# sourceMappingURL=tasks.routes.js.map