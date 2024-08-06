"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cloudinary_1 = require("cloudinary");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const env_config_1 = require("~/config/env.config");
const Error_1 = require("~/models/Error");
const streamifier_1 = tslib_1.__importDefault(require("streamifier"));
const cloudinary_build_url_1 = require("cloudinary-build-url");
cloudinary_1.v2.config({
    cloud_name: env_config_1.env.cloudinary.name,
    api_key: env_config_1.env.cloudinary.apiKey,
    api_secret: env_config_1.env.cloudinary.apiSecret,
    url: env_config_1.env.cloudinary.url
});
class CloudinaryService {
    async uploadImage(folder, imageBuffer) {
        return await new Promise((resolve, reject) => {
            const stream = cloudinary_1.v2.uploader.upload_stream({ folder, format: 'jpg' }, (error, result) => {
                if (result) {
                    return resolve(result);
                }
                return reject(new Error_1.ErrorWithStatus({
                    statusCode: error.http_code,
                    message: lodash_1.default.capitalize(error.message)
                }));
            });
            streamifier_1.default.createReadStream(imageBuffer).pipe(stream);
        });
    }
    async deleteImage(url) {
        return await new Promise((resolve, reject) => {
            const publicId = (0, cloudinary_build_url_1.extractPublicId)(url);
            cloudinary_1.v2.api.delete_resources([publicId], (error, result) => {
                if (result) {
                    return resolve(result);
                }
                return reject(error);
            });
        });
    }
}
const cloudinaryService = new CloudinaryService();
exports.default = cloudinaryService;
//# sourceMappingURL=cloudiary.services.js.map