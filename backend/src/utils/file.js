"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = exports.upload = void 0;
const tslib_1 = require("tslib");
const multer_1 = tslib_1.__importDefault(require("multer"));
const path_1 = tslib_1.__importDefault(require("path"));
// Define storage for uploaded files
const multerStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, './uploads');
    },
    filename: (_req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        cb(null, `${Date.now()}.${ext}`);
    }
});
// Initialize Multer with the storage configuration
exports.upload = (0, multer_1.default)({ storage: multerStorage, limits: { fieldSize: 10 * 1024 * 1024 } }); // limit file size is 10 mb
exports.uploadImage = (0, multer_1.default)({
    limits: { fieldSize: 3 * 1024 * 1024 },
    fileFilter(req, file, callback) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) {
            return callback(null, true);
        }
        callback(new Error('Please upload a valid image file'));
    }
}); // limit file image size is 3 mb and requires is file jpeg, jpg or png
//# sourceMappingURL=file.js.map