"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cloudiary_services_1 = tslib_1.__importDefault(require("./cloudiary.services"));
class UploadService {
    async uploadSingleImage(file) {
        const { url } = await cloudiary_services_1.default.uploadImage('images', file.buffer);
        const result = { imgUrl: url };
        return result;
    }
    async uploadMultipleImages(files) {
        const uploadPromises = files.map((file) => this.uploadSingleImage(file));
        const results = await Promise.all(uploadPromises);
        return results;
    }
}
const uploadService = new UploadService();
exports.default = uploadService;
//# sourceMappingURL=upload.services.js.map