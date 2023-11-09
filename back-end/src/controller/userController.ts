import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import CryptoJS from 'crypto-js';

import User from '../model/userModel';
import sendOTP from '../utils/sendOTP';
import generateTokens from '../utils/generateToken';

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

      const user = await User.findOneAndUpdate({ email: req.body.email }, { verify: true });
      if (user) {
            const { accessToken, refreshToken } = await generateTokens(user.id, user.roles);
            res.cookie("access_token", accessToken);
            res.cookie("refresh_token", refreshToken);
            res.status(200).json({
                  error: false, message: "Verify user sucessfully", accessToken, refreshToken
            });
      }
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

const login = async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
      }

      const user = await User.findOne({ email: req.body.email, password: CryptoJS.HmacSHA256(req.body.password, `${process.env.SECRET_KEY}`) }, { verify: true });
      if (user) {
            const { accessToken, refreshToken } = await generateTokens(user.id, user.roles);
            res.cookie("access_token", accessToken);
            res.cookie("refresh_token", refreshToken);
            res.status(200).json({
                  error: false, message: "Login sucessfully", accessToken, refreshToken
            });
      } else {
            res.status(200).json({
                  error: true, message: "Email or password not incorected!"
            });
      }
};

const getDetailUser = async (req: Request, res: Response, next: NextFunction) => {
      // console.log(req.body.user);
      const user = await User.findById(req.body.user._id);

      res.status(200).json({ message: "user authenticated.", user });
}

export default { register, verifyUser, resendVerifyUser, login, getDetailUser };
