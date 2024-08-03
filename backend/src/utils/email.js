"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTP = void 0;
const tslib_1 = require("tslib");
const nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
const helpers_1 = require("./helpers");
const env_config_1 = require("~/config/env.config");
const Error_1 = require("~/models/Error");
const http_status_codes_1 = require("http-status-codes");
const messages_1 = require("~/constants/messages");
const sendOTP = async (emailTo) => {
    const otp = (0, helpers_1.generateOTP)();
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: env_config_1.env.email.address,
            pass: env_config_1.env.email.password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    const mailOptions = {
        from: env_config_1.env.email.address,
        to: emailTo,
        subject: 'Verification Email',
        html: `<div style="font-family:Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2"><div style="margin:50px auto;width:70%;padding:20px 0"><div style="border-bottom:1px solid #eee"><a href="" style="font-size:1.4em;color:#00466a;text-decoration:none;font-weight:600">Task Manager</a></div><p style="font-size:1.1em">Hi,</p><p>Thank you for choosing Task Manager. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p><h2 style="background:#00466a;margin:0 auto;width:max-content;padding:0 10px;color:#fff;border-radius:4px">${otp}</h2><p style="font-size:.9em">Regards,<br>Task Manager</p><hr style="border:none;border-top:1px solid #eee"><div style="float:right;padding:8px 0;color:#aaa;font-size:.8em;line-height:1;font-weight:300"><p>Task Manager Inc</p><p>Thu Duc, Ho Chi Minh</p><p>Viet Nam</p></div></div></div>`
    };
    try {
        await transporter.sendMail(mailOptions);
        return Promise.resolve(otp);
    }
    catch (error) {
        throw new Error_1.ErrorWithStatus({ statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message: messages_1.RESULT_RESPONSE_MESSAGES.MAIL.SEND_OTP_FAILED });
    }
};
exports.sendOTP = sendOTP;
//# sourceMappingURL=email.js.map