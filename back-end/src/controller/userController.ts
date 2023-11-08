import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import User from '../model/userModel';

const register = async (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
      }

      res.send("Validated");
};

export default { register };
