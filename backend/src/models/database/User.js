"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("~/constants/enums");
class User {
    _id;
    fullName;
    email;
    password;
    dateOfBirth;
    avatar;
    bio;
    isOnline;
    role;
    verify;
    _destroy;
    created_at;
    updated_at;
    constructor(user) {
        this._id = user._id;
        this.fullName = user.fullName;
        this.email = user.email;
        this.password = user.password;
        this.dateOfBirth = user.dateOfBirth || undefined;
        this.avatar = user.avatar || '';
        this.bio = user.bio || '';
        this.isOnline = user.isOnline || false;
        this.role = user.role || enums_1.UserRole.User;
        this.verify = user.verify || enums_1.UserVerifyStatus.Unverified;
        this._destroy = user._destroy || false;
        this.created_at = user.created_at || new Date();
        this.updated_at = user.updated_at || new Date();
    }
}
exports.default = User;
//# sourceMappingURL=User.js.map