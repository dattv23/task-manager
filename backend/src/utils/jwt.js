"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const signToken = ({ payload, privateKey, options }) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, privateKey, options, (err, token) => {
            if (err) {
                reject(err);
            }
            resolve(token);
        });
    });
};
exports.signToken = signToken;
const verifyToken = ({ token, privateKey }) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, privateKey, function (err, decoded) {
            if (err) {
                throw reject(err);
            }
            resolve(decoded);
        });
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=jwt.js.map