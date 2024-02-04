import moment from 'moment'
import { StatusCodes } from 'http-status-codes'
import { ErrorEntityType, ErrorType } from '~/@types/error.type'
import { USER_VALIDATOR_MESSAGES } from '~/constants/messages'

type ErrorsType = Record<string, ErrorEntityType>

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

export class ErrorEntity extends ErrorWithStatus {
  errors: ErrorsType
  constructor({ message = USER_VALIDATOR_MESSAGES.TITLE, errors }: { message?: string; errors: ErrorsType }) {
    super({ message, statusCode: StatusCodes.UNPROCESSABLE_ENTITY })
    this.errors = errors
  }
}
