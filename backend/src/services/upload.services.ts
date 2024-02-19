import _ from 'lodash'
import cloudinaryService from './cloudiary.services'

class UploadService {
  async uploadSingleImage(file: Express.Multer.File): Promise<{ imgUrl: string }> {
    const { url } = await cloudinaryService.uploadImage('images', file.buffer)
    const result = { imgUrl: url }
    return result
  }

  async uploadMultipleImages(files: Express.Multer.File[]): Promise<{ imgUrl: string }[]> {
    const uploadPromises = files.map((file) => this.uploadSingleImage(file))
    const results = await Promise.all(uploadPromises)
    return results
  }
}

const uploadService = new UploadService()
export default uploadService
