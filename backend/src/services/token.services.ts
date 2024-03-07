import { Algorithm, SignOptions } from 'jsonwebtoken'
import { env } from '~/config/env.config'
import { TokenType, UserRole } from '~/constants/enums'
import { AccessTokenPayload, RefreshTokenPayload } from '~/models/requests/auth.requests'
import { signToken } from '~/utils/jwt'

class TokenServices {
  signAccessToken(userId: string, role: UserRole): Promise<string> {
    const { accessTokenKey, accessTokenEXP, jwtAlgorithm } = env.jwt
    const payload: AccessTokenPayload = {
      userId,
      role,
      tokenType: TokenType.AccessToken
    }
    const options: SignOptions = {
      expiresIn: accessTokenEXP,
      algorithm: jwtAlgorithm as Algorithm
    }
    return signToken({ payload, privateKey: accessTokenKey as string, options })
  }

  signRefreshToken(userId: string, role: UserRole): Promise<string> {
    const { refreshTokenKey, refreshTokenEXP, jwtAlgorithm } = env.jwt
    const payload: RefreshTokenPayload = {
      userId,
      role,
      tokenType: TokenType.RefreshToken
    }
    const options: SignOptions = {
      expiresIn: refreshTokenEXP,
      algorithm: jwtAlgorithm as Algorithm
    }
    return signToken({ payload, privateKey: refreshTokenKey as string, options })
  }

  signAccessAndRefreshToken(userId: string, role: UserRole): Promise<[string, string]> {
    return Promise.all([this.signAccessToken(userId, role), this.signRefreshToken(userId, role)])
  }
}

const tokenServices = new TokenServices()
export default tokenServices
