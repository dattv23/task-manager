import { checkSchema } from 'express-validator'
import userService from '../services/user.service'
import tokenService from '../services/token.service'
import isIsoDate from '../utils/checkISODate'

class UserMiddleware {
  validateRegister() {
    return checkSchema({
      name: {
        isEmpty: {
          negated: true,
          errorMessage: 'Name can not be empty'
        },
        isNumeric: {
          negated: true,
          errorMessage: 'Name can not contain number'
        },
        isLength: {
          options: { min: 6, max: 50 },
          errorMessage: 'Name must be length from 6 to 50 character'
        }
      },
      email: {
        notEmpty: {
          errorMessage: 'Email can not be empty'
        },
        isEmail: {
          errorMessage: 'Must be a valid Email address'
        },
        custom: {
          options: async (value) => {
            const user = await userService.getUserByEmail(value)
            if (user) throw new Error('Email exist')
            return true
          }
        }
      },
      password: {
        isEmpty: {
          negated: true,
          errorMessage: 'Password can not be empty'
        },
        isLength: {
          options: { min: 8 },
          errorMessage: 'Password must be longer than 8 characters'
        }
      },
      password_confirm: {
        notEmpty: {
          errorMessage: 'Password can not be empty'
        },
        isLength: {
          options: { min: 8 },
          errorMessage: 'Password must be longer than 8 characters'
        },
        custom: ({
          options: (val, { req }) => {
            if (val !== req.body.password) {
              throw new Error('password_confirm not match with password')
            }
            return true
          }
        })
      },
      date_of_birth: {
        notEmpty: {
          errorMessage: 'date_of_birth can not be empty'
        },
        custom: ({
          options: (val) => {
            if (!isIsoDate(val)) {
              throw new Error('date_of_birth must be format ISO8061')
            }
            return true
          }
        })
      }
    }, ['body'])
  }

  validateVerifyUser() {
    return checkSchema({
      email: {
        notEmpty: {
          errorMessage: 'Email can not be empty'
        },
        isEmail: {
          errorMessage: 'Must be a valid Email address'
        },
        custom: {
          options: async (value) => {
            const user = await userService.getUserByEmail(value)
            if (!user) throw new Error('Email not exist')
            return true
          }
        }
      },
      code: {
        notEmpty: {
          errorMessage: 'Code OTP can not be empty'
        },
        isLength: {
          options: { min: 6, max: 6 },
          errorMessage: 'Code OTP must be length is 6 digits'
        }
      }
    }, ['body'])
  }

  validateResendVerifyUser() {
    return checkSchema({
      email: {
        notEmpty: {
          errorMessage: 'Email can not be empty'
        },
        isEmail: {
          errorMessage: 'Must be a valid Email address'
        },
        custom: {
          options: async (value) => {
            const user = await userService.getUserByEmail(value)
            if (!user) throw new Error('Email not exist')
            return true
          }
        }
      }
    }, ['body'])
  }

  validateRefreshToken() {
    return checkSchema({
      refreshToken: {
        notEmpty: {
          errorMessage: 'refreshToken can not be empty'
        },
        custom: {
          options: async (value) => {
            const token = await tokenService.getRefreshToken(value)
            if (!token) throw new Error('refreshToken not exist')
            return true
          }
        }
      }
    }, ['body'])
  }

  validateLogin() {
    return checkSchema({
      email: {
        notEmpty: {
          errorMessage: 'Email can not be empty'
        },
        isEmail: {
          errorMessage: 'Must be a valid Email address'
        },
        custom: {
          options: async (value) => {
            const user = await userService.getUserByEmail(value)
            if (!user) throw new Error('Email not exist')
            return true
          }
        }
      },
      password: {
        notEmpty: {
          errorMessage: 'Password can not be empty'
        },
        isLength: {
          options: { min: 8 },
          errorMessage: 'Password must be longer than 8 characters'
        },
        custom: {
          options: async (value, { req }) => {
            const user = await userService.getUserByMailAndPass(req.body.email, value)
            if (!user) throw new Error('Email or password incorrect!')
            return true
          }
        }
      }
    }, ['body'])
  }
}

const userMiddleware = new UserMiddleware()
export default userMiddleware