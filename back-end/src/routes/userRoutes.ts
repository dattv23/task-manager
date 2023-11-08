import express from 'express';
import userController from '../controller/userController';
import { validateRegisterUser } from '../middlewares/validator';
const userRouter = express.Router();

userRouter.post('/register', validateRegisterUser(), userController.register);

export = userRouter;