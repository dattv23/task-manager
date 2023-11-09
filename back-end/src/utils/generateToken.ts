import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import Token from "../model/tokenModel";

// require('crypto').randomBytes(64).toString('hex')
const generateTokens = async (_id: ObjectId, roles: string[]) => {
      try {
            const payload = { _id: _id, roles: roles };
            const accessToken = jwt.sign(
                  payload,
                  `${process.env.ACCESS_TOKEN_SECRET}`,
                  { expiresIn: "20m" }
            );
            const refreshToken = jwt.sign(
                  payload,
                  `${process.env.REFRESH_TOKEN_SECRET}`,
                  { expiresIn: "30d" }
            );

            await Token.findOneAndDelete({ userId: _id });

            await new Token({ userId: _id, token: refreshToken }).save();
            return Promise.resolve({ accessToken, refreshToken });
      } catch (err) {
            return Promise.reject(err);
      }
};

export default generateTokens;