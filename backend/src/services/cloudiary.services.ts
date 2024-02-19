import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import _ from 'lodash'
import { env } from '~/config/env.config'
import { ErrorWithStatus } from '~/models/Error'
import streamifier from 'streamifier'
import { extractPublicId } from 'cloudinary-build-url'

cloudinary.config({
  cloud_name: env.cloudinary.name,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
  url: env.cloudinary.url
})

class CloudinaryService {
  async uploadImage(folder: string, imageBuffer: Buffer) {
    return await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ folder, format: 'jpg' }, (error, result) => {
        if (result) {
          return resolve(result)
        }
        return reject(
          new ErrorWithStatus({
            statusCode: error!.http_code,
            message: _.capitalize(error!.message)
          })
        )
      })
      streamifier.createReadStream(imageBuffer).pipe(stream)
    })
  }

  async deleteImage(url: string) {
    return await new Promise((resolve, reject) => {
      const publicId = extractPublicId(url)
      cloudinary.api.delete_resources([publicId], (error, result) => {
        if (result) {
          return resolve(result)
        }
        return reject(error)
      })
    })
  }
}
const cloudinaryService = new CloudinaryService()

export default cloudinaryService
