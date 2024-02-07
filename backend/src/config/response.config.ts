import { Response } from 'express'
import moment from 'moment'
import { StatusCodes } from 'http-status-codes'

export const sendResponse = {
  success: (response: Response, data: any, message: string) => {
    response.status(StatusCodes.OK).json({
      statusCode: StatusCodes.OK,
      data: data,
      message: message,
      dataTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
    })
  },
  created: (response: Response, data: any, message: string) => {
    response.status(StatusCodes.CREATED).json({
      statusCode: StatusCodes.CREATED,
      data: data,
      message: message,
      dataTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
    })
  },
  noContent: (response: Response, data: any, message: string) => {
    response.status(StatusCodes.NO_CONTENT).json({
      statusCode: StatusCodes.NO_CONTENT,
      data: data,
      message: message,
      dataTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
    })
  },
  badRequest: (response: Response, data: any, message: string) => {
    response.status(StatusCodes.BAD_REQUEST).json({
      statusCode: StatusCodes.BAD_REQUEST,
      data: data,
      message: message,
      dataTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
    })
  },
  unauthorized: (response: Response, data: any, message: string) => {
    response.status(StatusCodes.UNAUTHORIZED).json({
      statusCode: StatusCodes.UNAUTHORIZED,
      data: data,
      message: message,
      dataTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
    })
  },
  validation: (response: Response, errors: any, message: string) => {
    response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
      errors: errors,
      message: message,
      dataTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
    })
  },
  forbidden: (response: Response, message: string) => {
    response.status(StatusCodes.FORBIDDEN).json({
      statusCode: StatusCodes.FORBIDDEN,
      message: message,
      dataTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
    })
  },
  notFound: (response: Response, data: any, message: string) => {
    response.status(StatusCodes.NOT_FOUND).json({
      statusCode: StatusCodes.NOT_FOUND,
      data: data,
      message: message,
      dataTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
    })
  },
  conflict: (response: Response, message: string) => {
    response.status(StatusCodes.CONFLICT).json({
      statusCode: StatusCodes.CONFLICT,
      message: message,
      dataTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
    })
  },
  error: (response: Response, message: string) => {
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: message,
      dataTime: moment(new Date()).format('DD-MM-YYYY\\tHH:mm:ss')
    })
  }
}
