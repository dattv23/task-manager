"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("~/constants/enums");
class Task {
    _id;
    userId;
    name;
    description;
    priority;
    dueDate;
    status;
    startDate;
    created_at;
    updated_at;
    _destroy;
    constructor(task) {
        this._id = task._id;
        this.userId = task.userId;
        this.name = task.name;
        this.description = task.description || '';
        this.priority = task.priority;
        this.startDate = task.startDate || new Date();
        this.dueDate = task.dueDate;
        this.status = task.status || enums_1.TaskStatus.PENDING;
        this.created_at = task.created_at || new Date();
        this.updated_at = task.updated_at || new Date();
        this._destroy = task._destroy || false;
    }
}
exports.default = Task;
//# sourceMappingURL=Task.js.map