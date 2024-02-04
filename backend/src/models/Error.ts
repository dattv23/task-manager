import moment from 'moment'
import { ErrorType } from '~/@types/error.types'

export class ErrorWithStatus {
  statusCode: number
  message: string
  created_at: string
  updated_at: string

  constructor({ statusCode, message, created_at, updated_at }: ErrorType) {
    this.statusCode = statusCode
    this.message = message
    this.created_at = created_at || moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS')
    this.updated_at = updated_at || moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ssSSS')
  }
}
