import { body } from 'express-validator'
import CryptoJS from 'crypto-js'

import User from '../model/userModel'
import OTP from '../model/otpModel'

const validateEmail = () => {
  return [
    body('email', 'Email does not Empty').not().isEmpty(),
    body('email', 'Invalid email').isEmail()
  ]
}

const validateRegisterUser = () => {
  return [
    ...validateEmail(),
    body('email').custom(async value => {
      const user = await User.findOne({ email: value })
      if (user) {
        throw new Error('E-mail already in use')
      }
    }),
    body('name', 'Name does not Empty').not().isEmpty(),
    body('name', 'Name must be Alphanumeric').not().isAlphanumeric(),
    body('name', 'Name more than 6 degits').isLength({ min: 6 }),
    body('date_of_birth', 'Invalid birthday').isISO8601().toDate(),
    body('password', 'Password more than 8 degits').isLength({ min: 8 }),
    body('comfirm_password', 'Password comfirm more than 8 degits').isLength({ min: 8 }),
    body('password', 'Password not match with password comfirm').custom((value, { req }) => {
      return value === req.body.comfirm_password
    })
  ]
}

const validateResendVerifyUser = () => {
  return [
    ...validateEmail(),
    body('email').custom(async value => {
      const user = await User.findOne({ email: value })
      if (!user) {
        throw new Error('E-mail not exist in database')
      }
    })
  ]
}

const validateVerifyUser = () => {
  return [
    ...validateEmail(),
    body('email').custom(async value => {
      const user = await User.findOne({ email: value })
      if (!user) {
        throw new Error('E-mail not exist in database')
      }
    }),
    body('email').custom(async value => {
      const otp = await OTP.findOne({ email: value })
      if (!otp) {
        throw new Error('OTP has expired')
      }
    }),
    body('otp', 'OTP does not Empty').not().isEmpty(),
    body('otp', 'OTP must be Alphanumeric').isAlphanumeric(),
    body('otp', 'OTP must include 6 numbers').custom((value) => {
      return value.length === 6
    }),
    body('otp', 'OTP must include 6 numbers').custom(async (value, { req }) => {

      const otp = await OTP.findOne({ email: req.body.email, otp: CryptoJS.HmacSHA256(value, `${process.env.SECRET_KEY}`) })
      if (!otp) {
        throw new Error('OTP is incorrect')
      }
    })
  ]
}

const validateRefreshToken = () => {
  return [
    body('refreshToken', 'refreshToken dose not Empty').not().isEmpty(),
    body('refreshToken', 'refreshToken mush be string').isString()
  ]
}

const validateLogin = () => {
  return [
    ...validateEmail(),
    body('password', 'password more than 8 degits').isLength({ min: 8 })
  ]
}

export { validateRegisterUser, validateResendVerifyUser, validateVerifyUser, validateRefreshToken, validateLogin }
