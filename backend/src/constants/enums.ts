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

export enum TaskPriority {
  LESS_IMPORTANT = 'Less Important',
  IMPORTANT = 'Important',
  VERY_IMPORTANT = 'Very Important'
}

export enum TaskStatus {
  PENDING = 'Pending',
  IN_PROGRESS = 'In Progress',
  COMPLETED = 'Completed'
}
