"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapRequestHandler = void 0;
const wrapRequestHandler = (func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        }
        catch (error) {
            next(error);
        }
    };
};
exports.wrapRequestHandler = wrapRequestHandler;
//# sourceMappingURL=handler.js.map