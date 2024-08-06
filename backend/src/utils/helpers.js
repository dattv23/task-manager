"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.regexOTP = exports.regexPassword = void 0;
/**
 * At least one lowercase alphabet i.e. [a-z]
 * At least one uppercase alphabet i.e. [A-Z]
 * At least one Numeric digit i.e. [0-9]
 * At least one special character i.e. [‘@’, ‘$’, ‘.’, ‘#’, ‘!’, ‘%’, ‘*’, ‘?’, ‘&’, ‘^’]
 * Also, the total length must be in the range [8-16]
 */
exports.regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,16}$/;
exports.regexOTP = /^\d{6}$/;
const generateOTP = () => {
    const digits = '0123456789';
    let OTP = '';
    for (let index = 0; index < 6; index++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
};
exports.generateOTP = generateOTP;
//# sourceMappingURL=helpers.js.map