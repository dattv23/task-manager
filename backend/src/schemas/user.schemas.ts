import { StatusCodes } from 'http-status-codes'
import { z } from 'zod'
import { VALIDATION_MESSAGES } from '~/constants/messages'
import { ErrorWithStatus } from '~/models/Error'
import { databaseService } from '~/services/database.services'
import { regexOTP } from '~/utils/helpers'

export const userRegistrationSchema = z.object({
  fullName: z.string({
    required_error: VALIDATION_MESSAGES.USER.FULL_NAME_IS_REQUIRED,
    invalid_type_error: VALIDATION_MESSAGES.USER.FULL_NAME_MUST_BE_STRING
  }),
  email: z
    .string({
      required_error: VALIDATION_MESSAGES.USER.EMAIL_IS_REQUIRED,
      invalid_type_error: VALIDATION_MESSAGES.USER.EMAIL_MUST_BE_STRING
    })
    .email({ message: VALIDATION_MESSAGES.USER.EMAIL_INVALID })
    .refine(
      async (email) => {
        const user = await databaseService.users.findOne({ email: email })
        if (user) return false
        return true
      },
      { message: VALIDATION_MESSAGES.USER.EMAIL_ACCESSIBILITY }
    ),
  password: z
    .string({
      required_error: VALIDATION_MESSAGES.USER.PASSWORD_IS_REQUIRED,
      invalid_type_error: VALIDATION_MESSAGES.USER.PASSWORD_MUST_BE_STRING
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/, { message: VALIDATION_MESSAGES.USER.PASSWORD_INVALID })
})

export const verifyOTPSchema = z.object({
  email: z
    .string({
      required_error: VALIDATION_MESSAGES.USER.EMAIL_IS_REQUIRED,
      invalid_type_error: VALIDATION_MESSAGES.USER.EMAIL_MUST_BE_STRING
    })
    .email({ message: VALIDATION_MESSAGES.USER.EMAIL_INVALID })
    .refine(
      async (email) => {
        const user = await databaseService.users.findOne({ email })
        if (!user) return false
        return true
      },
      { message: VALIDATION_MESSAGES.USER.EMAIL_NOT_EXIST }
    ),
  code: z
    .string({
      required_error: VALIDATION_MESSAGES.USER.OTP.IS_REQUIRED
    })
    .regex(regexOTP, { message: VALIDATION_MESSAGES.USER.OTP.IS_INVALID })
})

export const resendOTP = z.object({
  email: z
    .string({
      required_error: VALIDATION_MESSAGES.USER.EMAIL_IS_REQUIRED,
      invalid_type_error: VALIDATION_MESSAGES.USER.EMAIL_MUST_BE_STRING
    })
    .email({ message: VALIDATION_MESSAGES.USER.EMAIL_INVALID })
    .refine(
      async (email) => {
        const user = await databaseService.users.findOne({ email })
        if (!user) {
          throw new ErrorWithStatus({ statusCode: StatusCodes.NOT_FOUND, message: VALIDATION_MESSAGES.USER.EMAIL_NOT_EXIST })
        }
        return true
      },
      { message: VALIDATION_MESSAGES.USER.EMAIL_NOT_EXIST }
    )
})
