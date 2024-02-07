import jwt from 'jsonwebtoken'
import { SignTokenType } from '~/@types/token.type'

export const signToken = ({ payload, privateKey, options }: SignTokenType): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    jwt.sign(payload, privateKey, options, (err, token) => {
      if (err) {
        reject(err)
      }
      resolve(token as string)
    })
  })
}
