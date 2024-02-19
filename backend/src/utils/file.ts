import multer from 'multer'
import path from 'path'

// Define storage for uploaded files
const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, './uploads')
  },
  filename: (_req, file, cb) => {
    const ext = file.mimetype.split('/')[1]
    cb(null, `${Date.now()}.${ext}`)
  }
})

// Initialize Multer with the storage configuration
export const upload = multer({ storage: multerStorage, limits: { fieldSize: 10 * 1024 * 1024 } }) // limit file size is 10 mb
export const uploadImage = multer({
  limits: { fieldSize: 3 * 1024 * 1024 },
  fileFilter(req, file, callback) {
    const filetypes = /jpeg|jpg|png/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (extname && mimetype) {
      return callback(null, true)
    }

    callback(new Error('Please upload a valid image file'))
  }
}) // limit file image size is 3 mb and requires is file jpeg, jpg or png
