import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import CryptoJS from 'crypto-js';

import User from '../model/userModel';
import sendOTP from '../utils/sendOTP';

const register = async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
      }

      const hashPassword = CryptoJS.HmacSHA256(req.body.password, `${process.env.SECRET_KEY}`);
      await new User({ ...req.body, password: hashPassword }).save();

      sendOTP(req.body.email);

      res.status(201).json({ error: false, message: "Account created sucessfully" });
};

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
      }

      await User.findOneAndUpdate({ email: req.body.email }, { verify: true });
      res.status(200).json({ error: false, message: "Verify user sucessfully" });
}

const resendVerifyUser = async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
      }

      sendOTP(req.body.email);

      res.status(201).json({ error: false, message: "Send otp sucessfully" });
}

export default { register, verifyUser, resendVerifyUser };
