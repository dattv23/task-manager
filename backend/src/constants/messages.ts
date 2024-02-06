export const DATABASE_MESSAGE = {
  CONNECT: '🌱 Connected to database successfully!',
  DISCONNECT: '⛔️ Disconnected from the database main successfully!'
}

export const VALIDATION_MESSAGES = {
  TITLE: 'Validation data',
  USER: {
    FULL_NAME_IS_REQUIRED: 'Full name is required',
    FULL_NAME_MUST_BE_STRING: 'Full name must be string',
    EMAIL_IS_REQUIRED: 'Email is required',
    EMAIL_MUST_BE_STRING: 'Email must be a valid email address',
    EMAIL_INVALID: 'Email invalid',
    EMAIL_ACCESSIBILITY: 'The email address is already subscribed. Please use a different email.',
    PASSWORD_IS_REQUIRED: 'Password is required',
    PASSWORD_MUST_BE_STRING: 'Password must be string',
    PASSWORD_INVALID: 'Password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
  }
}

export const RESULT_RESPONSE_MESSAGES = {
  USER: {
    REGISTER: 'Created account successfully!',
    SEND_OTP_FAILED: 'Failed to send otp. Please try again!'
  }
}
