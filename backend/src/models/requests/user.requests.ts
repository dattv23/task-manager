import { TokenType, UserRole } from '~/constants/enums'

export interface RegisterBody {
  fullName: string
  email: string
  password: string
}

export interface AccessTokenPayload {
  userID: string
  role: UserRole
  tokenType: TokenType.AccessToken
}

export interface RefreshTokenPayload {
  userID: string
  role: UserRole
  tokenType: TokenType.RefreshToken
}

export interface VerifyOTPBody {
  email: string
  code: string
}

export interface ResendOTPBody {
  email: string
}

export interface ResetPasswordBody {
  email: string
  password: string
}

export interface LoginBody {
  email: string
  password: string
}
