import { Schema, model } from "mongoose";

const verifyEmailSchema = new Schema({
      email: {
            type: String,
            required: true,
      },
      otp: {
            type: String,
            required: true,
      },
});

const VerifyEmail = model('VerifyEmail', verifyEmailSchema);
export default VerifyEmail;