import { body, check } from 'express-validator';
import User from '../model/userModel';

let validateRegisterUser = () => {
      return [
            body('email').custom(async value => {
                  const user = await User.findOne({ email: value });
                  if (user) {
                        throw new Error('E-mail already in use');
                  }
            }),
            body('name', 'Name does not Empty').not().isEmpty(),
            body('name', 'Name must be Alphanumeric').not().isAlphanumeric(),
            body('name', 'username more than 6 degits').isLength({ min: 6 }),
            body('email', 'Invalid does not Empty').not().isEmpty(),
            body('email', 'Invalid email').isEmail(),
            body('date_of_birth', 'Invalid birthday').isISO8601().toDate(),
            body('password', 'Password more than 8 degits').isLength({ min: 8 }),
            body('comfirm_password', 'Password comfirm more than 8 degits').isLength({ min: 8 }),
            body('password', 'Password not match with password comfirm').custom((value, { req }) => {
                  return value === req.body.comfirm_password;
            })
      ];
}

let validateLogin = () => {
      return [
            body('email', 'Invalid does not Empty').not().isEmpty(),
            body('email', 'Invalid email').isEmail(),
            body('password', 'password more than 8 degits').isLength({ min: 8 })
      ];
}

export { validateRegisterUser, validateLogin };

