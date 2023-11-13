import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import Token from '../models/token.model'
import verifyRefreshToken from '../utils/verifyRefreshToken'

// get new access token
const createNewAccessToken = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() })
    return
  }

  verifyRefreshToken(req.body.refreshToken)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then(({ tokenDetails }: any) => {
      const payload = { _id: tokenDetails._id, roles: tokenDetails.roles }
      const accessToken = jwt.sign(
        payload,
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: '20m' }
      )
      res.status(200).json({
        error: false,
        accessToken,
        message: 'Access token created successfully'
      })
    })
    .catch((err) => res.status(400).json(err))
}

// logout
const logout = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() })
      return
    }

    const userToken = await Token.findOne({ token: req.body.refreshToken })
    if (!userToken)
      return res
        .status(404)
        .json({ error: false, message: 'Logged Out Failed' })

    await userToken.deleteOne()
    res.status(200).json({ error: false, message: 'Logged Out Sucessfully' })
  } catch (err) {
    // console.log(err)
    res.status(500).json({ error: true, message: 'Internal Server Error' })
  }
}

export default { createNewAccessToken, logout }
