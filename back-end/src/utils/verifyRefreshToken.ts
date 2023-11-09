import jwt from "jsonwebtoken";
import Token from "../model/tokenModel";

const verifyRefreshToken = (refreshToken: string) => {
      return new Promise((resolve, reject) => {
            Token.findOne({ token: refreshToken }, (err: Error, doc: Document) => {
                  if (!doc)
                        return reject({ error: true, message: "Invalid refresh token" });

                  jwt.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`, (err, tokenDetails) => {
                        if (err)
                              return reject({ error: true, message: "Invalid refresh token" });
                        resolve({
                              tokenDetails,
                              error: false,
                              message: "Valid refresh token",
                        });
                  });
            });
      });
};

export default verifyRefreshToken;