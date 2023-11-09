import express from 'express';
import userController from '../controller/userController';
import { validateRegisterUser, validateResendVerifyUser, validateVerifyUser } from '../utils/validator';
const userRouter = express.Router();

userRouter.post('/register', validateRegisterUser(), userController.register);
userRouter.post('/verify-user', validateVerifyUser(), userController.verifyUser);
userRouter.post('/resend-verify-user', validateResendVerifyUser(), userController.resendVerifyUser);

export = userRouter;