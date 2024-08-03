"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateData = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = validateData;
//# sourceMappingURL=validation.middlewares.js.map