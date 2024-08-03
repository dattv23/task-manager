"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RefreshToken {
    _id;
    userId;
    token;
    created_at;
    updated_at;
    constructor(refreshToken) {
        this._id = refreshToken._id;
        this.userId = refreshToken.userId;
        this.token = refreshToken.token;
        this.created_at = refreshToken.created_at || new Date();
        this.updated_at = refreshToken.updated_at || new Date();
    }
}
exports.default = RefreshToken;
//# sourceMappingURL=RefreshToken.js.map