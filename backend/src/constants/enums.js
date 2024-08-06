"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatus = exports.TaskPriority = exports.TokenType = exports.UserRole = exports.UserVerifyStatus = void 0;
var UserVerifyStatus;
(function (UserVerifyStatus) {
    UserVerifyStatus["Unverified"] = "Unverified";
    UserVerifyStatus["Verified"] = "Verified";
    UserVerifyStatus["Banned"] = "Banned";
})(UserVerifyStatus || (exports.UserVerifyStatus = UserVerifyStatus = {}));
var UserRole;
(function (UserRole) {
    UserRole["Admin"] = "Admin";
    UserRole["User"] = "User";
})(UserRole || (exports.UserRole = UserRole = {}));
var TokenType;
(function (TokenType) {
    TokenType["AccessToken"] = "AccessToken";
    TokenType["RefreshToken"] = "RefreshToken";
    TokenType["OTP"] = "OTPToken";
})(TokenType || (exports.TokenType = TokenType = {}));
var TaskPriority;
(function (TaskPriority) {
    TaskPriority["LESS_IMPORTANT"] = "Less Important";
    TaskPriority["IMPORTANT"] = "Important";
    TaskPriority["VERY_IMPORTANT"] = "Very Important";
})(TaskPriority || (exports.TaskPriority = TaskPriority = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["PENDING"] = "Pending";
    TaskStatus["IN_PROGRESS"] = "In Progress";
    TaskStatus["COMPLETED"] = "Completed";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
//# sourceMappingURL=enums.js.map