"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class default_1 {
    _id;
    email;
    code;
    created_at;
    constructor(otp) {
        this._id = otp._id;
        this.email = otp.email;
        this.code = otp.code;
        this.created_at = new Date();
    }
}
exports.default = default_1;
//# sourceMappingURL=OTP.js.map