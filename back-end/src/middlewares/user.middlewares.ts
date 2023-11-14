import { checkSchema } from 'express-validator'
import { userService } from '../services/user.service'

class UserMiddeleware {
  validateRegister() {
    return checkSchema({
      name: {
        isEmpty: {
          negated: true,
          errorMessage: 'Name cannot be empty'
        },
        isNumeric: {
          negated: true,
          errorMessage: 'Name cannot contain number'
        },
        isLength: {
          options: { min: 6, max: 50 },
          errorMessage: 'Name must be length from 6 to 50 character'
        }
      },
      email: {
        notEmpty: {
          errorMessage: 'Email cannot be empty'
        },
        isEmail: {
          errorMessage: 'Must be a valid Email address'
        },
        custom: {
          options: async (value) => {
            const user = await userService.getUserByEmaiil(value)
            if (user) throw new Error('Email exist')
            return true
          }
        }
      },
      password: {
        isEmpty: {
          negated: true,
          errorMessage: 'Password cannot be empty'
        },
        isLength: {
          options: { min: 8 },
          errorMessage: 'Password must be longer than 8 characters'
        }
      },
      passwordComfirm: {
        isEmpty: {
          negated: true,
          errorMessage: 'Password cannot be empty'
        },
        isLength: {
          options: { min: 8 },
          errorMessage: 'Password must be longer than 8 characters'
        },
        custom: ({
          options: (val, { req }) => {
            if (val !== req.body.password) {
              throw new Error('passwordComfirm not match with password')
            }
            return true
          }
        })
      },
      dateOfBirth: {
        isEmpty: {
          negated: true,
          errorMessage: 'dateOfBirth cannot be empty'
        },
        isISO8601: {
          negated: false,
          errorMessage: 'Date must be format ISO8061'
        }
      }
    })
  }
}

const userMiddeleware = new UserMiddeleware()
export { userMiddeleware }