"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_routes_1 = tslib_1.__importDefault(require("./auth.routes"));
const users_routes_1 = tslib_1.__importDefault(require("./users.routes"));
const tasks_routes_1 = tslib_1.__importDefault(require("./tasks.routes"));
const rootRouter = (0, express_1.Router)();
rootRouter.use('/auth', auth_routes_1.default);
rootRouter.use('/users', users_routes_1.default);
rootRouter.use('/tasks', tasks_routes_1.default);
exports.default = rootRouter;
//# sourceMappingURL=index.js.map