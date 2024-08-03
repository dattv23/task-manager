"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_services_1 = require("./database.services");
const mongodb_1 = require("mongodb");
const database_1 = require("~/models/database");
const Error_1 = require("~/models/Error");
const http_status_codes_1 = require("http-status-codes");
const messages_1 = require("~/constants/messages");
class TasksServices {
    async getTasks(payload) {
        const { userId } = payload;
        const result = await database_services_1.databaseService.tasks.find({ userId: new mongodb_1.ObjectId(userId) });
        const content = (await result.toArray()).filter((item) => item._destroy !== true);
        return content;
    }
    async getTaskById(params) {
        const { id } = params;
        const task = await database_services_1.databaseService.tasks.findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!task || task._destroy === true) {
            throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.NOT_FOUND, message: messages_1.RESULT_RESPONSE_MESSAGES.TASKS.GET_TASK_BY_ID.NOT_FOUND });
        }
        const content = task;
        return content;
    }
    async createTask(payload) {
        const { userId, name, description, priority, dueDate, status } = payload;
        const newTask = new database_1.Task({ userId: new mongodb_1.ObjectId(userId), name, description, priority, dueDate, status });
        const result = await database_services_1.databaseService.tasks.insertOne(newTask);
        const content = { _id: result.insertedId, userId: new mongodb_1.ObjectId(userId), name, description, priority, dueDate, status };
        return content;
    }
    async editTask(payload, params) {
        const { id } = params;
        const { userId, name, description, priority, startDate, dueDate, status } = payload;
        const task = await database_services_1.databaseService.tasks.findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!task || task._destroy === true) {
            throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.NOT_FOUND, message: messages_1.RESULT_RESPONSE_MESSAGES.TASKS.EDIT_TASK.NOT_FOUND });
        }
        const taskUpdated = {
            name: name ? name : task.name,
            description: description ? description : task.description,
            priority: priority ? priority : task.priority,
            startDate: startDate ? startDate : task.startDate,
            dueDate: dueDate ? dueDate : task.dueDate,
            status: status ? status : task.status
        };
        await database_services_1.databaseService.tasks.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
            $set: taskUpdated
        }, { upsert: true });
        const content = { _id: new mongodb_1.ObjectId(id), ...taskUpdated, userId: new mongodb_1.ObjectId(userId) };
        return content;
    }
    async deleteTask(params) {
        const { id } = params;
        const task = await database_services_1.databaseService.tasks.findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!task || task._destroy === true) {
            throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.NOT_FOUND, message: messages_1.RESULT_RESPONSE_MESSAGES.TASKS.DELETE_TASK.NOT_FOUND });
        }
        await database_services_1.databaseService.tasks.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: { _destroy: true } }, { upsert: true });
        return true;
    }
}
const tasksServices = new TasksServices();
exports.default = tasksServices;
//# sourceMappingURL=tasks.services.js.map