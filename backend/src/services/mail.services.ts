import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

import { env } from '~/config/env.config'
import { MailBody } from '~/models/requests/mail.requests'

class MailServices {
  private transporter: nodemailer.Transporter

  constructor() {
    // Mailtrap service
    // this.transporter = nodemailer.createTransport({
    //   host: 'sandbox.smtp.mailtrap.io', // replace with your SMTP host if needed
    //   port: 2525, // replace with your SMTP port if needed
    //   secure: false, // true for 465, false for other ports
    //   auth: {
    //     user: env.email.address, // your SMTP username
    //     pass: env.email.password // your SMTP password
    //   },
    //   tls: {
    //     rejectUnauthorized: false
    //   }
    // })

    this.transporter = nodemailer.createTransport({
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
  }

  async send(payload: MailBody): Promise<string> {
    const { to, subject, content } = payload

    // Validate that the 'to' field is not empty
    if (!to || to.trim() === '') {
      throw new Error('Recipient email address is required')
    }

    // Read the HTML file content
    // const htmlFilePath = path.join(__dirname, '..', 'templates', 'mail-test.html')
    // const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8')

    const mailOptions = {
      from: env.email.address, // sender address
      to, // recipient address
      subject, // subject line
      html: content // send HTML content from the file
    }

    try {
      await this.transporter.sendMail(mailOptions)
      return 'Email sent successfully'
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error sending email:', error)
        throw new Error(`Failed to send email: ${error.message}`)
      } else {
        throw new Error('Failed to send email due to an unknown error')
      }
    }
  }
}

const mailServices = new MailServices()
export default mailServices
