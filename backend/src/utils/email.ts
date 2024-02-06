import nodemailer from 'nodemailer'
import { generateOTP } from './helpers'
import { env } from '~/config/env.config'
import { ErrorWithStatus } from '~/models/Error'
import { StatusCodes } from 'http-status-codes'
import { RESULT_RESPONSE_MESSAGES } from '~/constants/messages'

const sendOTP = async (emailTo: string) => {
  const otp = generateOTP()

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: env.email.address,
      pass: env.email.password
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const mailOptions = {
    from: env.email.address,
    to: emailTo,
    subject: 'Verification Email',
    html: `<div style="font-family:Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"><div style="margin:50px auto;width:70%;padding:20px 0"><div style="border-bottom:1px solid #eee"><a href="" style="font-size:1.4em;color:#00466a;text-decoration:none;font-weight:600">Task Manager</a></div><p style="font-size:1.1em">Hi,</p><p>Thank you for choosing Task Manager. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p><h2 style="background:#00466a;margin:0 auto;width:max-content;padding:0 10px;color:#fff;border-radius:4px">${otp}</h2><p style="font-size:.9em">Regards,<br>Task Manager</p><hr style="border:none;border-top:1px solid #eee"><div style="float:right;padding:8px 0;color:#aaa;font-size:.8em;line-height:1;font-weight:300"><p>Task Manager Inc</p><p>Thu Duc, Ho Chi Minh</p><p>Viet Nam</p></div></div></div>`
  }

  try {
    await transporter.sendMail(mailOptions)
    return Promise.resolve(otp)
  } catch (error) {
    throw new ErrorWithStatus({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, message: RESULT_RESPONSE_MESSAGES.USER.SEND_OTP_FAILED })
  }
}

export { sendOTP }
