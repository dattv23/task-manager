"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashText = exports.sha256 = void 0;
const crypto_1 = require("crypto");
const env_config_1 = require("~/config/env.config");
const sha256 = (content) => (0, crypto_1.createHash)('sha256').update(content).digest('hex');
exports.sha256 = sha256;
const hashText = (text) => (0, exports.sha256)(text + env_config_1.env.server.secret);
exports.hashText = hashText;
//# sourceMappingURL=crypto.js.map