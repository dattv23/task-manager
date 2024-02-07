export enum UserVerifyStatus {
  Unverified = 'Unverified',
  Verified = 'Verified',
  Banned = 'Banned'
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User'
}

export enum TokenType {
  AccessToken = 'AccessToken',
  RefreshToken = 'RefreshToken',
  OTP = 'OTPToken'
}
