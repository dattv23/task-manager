import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import CryptoJS from 'crypto-js';

import User from '../model/userModel';
import { generateOTP } from '../utils/generateOTP';
import VerifyEmail from '../model/verifyEmailModel';

const register = async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
      }

      const hashPassword = CryptoJS.HmacSHA256(req.body.password, `${process.env.SECRET_KEY}`);
      await new User({ ...req.body, password: hashPassword }).save();

      let otp = generateOTP();
      let encryptOTP = CryptoJS.AES.encrypt(otp, `${process.env.SECRET_KEY}`);
      await new VerifyEmail({ email: req.body.email, otp: encryptOTP }).save();

      res.status(201).json({ error: false, message: "Account created sucessfully" });
};

export default { register };
