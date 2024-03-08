export const DATABASE_MESSAGE = {
  CONNECT: '🌱 Connected to database successfully!',
  DISCONNECT: '⛔️ Disconnected from the database main successfully!'
}

export const VALIDATION_MESSAGES = {
  TITLE: 'Validation data',
  AUTH: {
    FULL_NAME_IS_REQUIRED: 'Full name is required',
    FULL_NAME_MUST_BE_STRING: 'Full name must be string',
    EMAIL_IS_REQUIRED: 'Email is required',
    EMAIL_MUST_BE_STRING: 'Email must be a valid email address',
    EMAIL_INVALID: 'Email invalid',
    EMAIL_NOT_EXIST: 'Email not exist',
    EMAIL_ACCESSIBILITY: 'The email address is already subscribed. Please use a different email.',
    PASSWORD_IS_REQUIRED: 'Password is required',
    PASSWORD_MUST_BE_STRING: 'Password must be string',
    PASSWORD_INVALID: 'Password must be 8-16 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
    REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',

    OTP: {
      IS_REQUIRED: 'Code OTP is required',
      IS_INVALID: 'Code OTP is invalid'
    }
  },
  UPLOAD: {
    FILE_REQUIRED: 'Please choose a file to upload',

    IMAGE: {
      FAILED: 'Uploading image failed!'
    }
  },
  TASK: {
    NAME_REQUIRED: 'A task name is required.',
    NAME_LENGTH_ERROR: 'The task name must be between 5 and 125 characters long.',
    DESCRIPTION_LENGTH_ERROR: 'The task description must be between 5 and 255 characters long.',
    PRIORITY_REQUIRED: 'A task priority is required.',
    DUE_DATE_REQUIRED: 'A due date for the task is required.',
    INVALID_DATE: 'The due date must be a valid date in the format YYYY-MM-DDTHH:MM:SSZ.',
    INVALID_PRIORITY: 'Invalid task priority. Please select a valid priority level (LESS_IMPORTANT, IMPORTANT, VERY_IMPORTANT).',
    INVALID_STATUS: 'Invalid task status. Please select a valid priority level (PENDING, IN_PROGRESS, COMPLETED).'
  }
}

export const RESULT_RESPONSE_MESSAGES = {
  MAIL: {
    SEND_OTP_FAILED: 'Failed to send otp. Please try again!'
  },
  AUTH: {
    REGISTER: {
      IS_SUCCESS: 'Created account successfully!'
    },
    VERIFY_OTP: {
      IS_EXPIRED: 'Code OTP is expired',
      IS_INCORRECT: 'Code OTP is incorrect',
      IS_SUCCESS: 'Verified OTP successfully'
    },
    RESEND_OTP: {
      EMAIL_NOT_EXIST: 'Email not exist',
      IS_SUCCESS: 'Resend OTP successfully'
    },
    RESET_PASSWORD: {
      EMAIL_NOT_EXIST: 'Email not exist',
      IS_SUCCESS: 'Reset password successfully'
    },
    LOGIN: {
      EMAIL_NOT_EXIST: 'Email not exist',
      PASSWORD_INCORRECT: 'Password is incorrect',
      IS_SUCCESS: 'Login successfully',
      ACCOUNT_UNVERIFIED: 'Account is not verified'
    },
    NEW_TOKEN: {
      USER_NOT_EXIST: 'User not exist',
      REFRESH_TOKEN_EXPIRED: 'Refresh token is expired',
      IS_SUCCESS: 'Create new token successfully'
    }
  },
  USERS: {
    USER_NOT_EXIST: 'User not exist',
    GET_PROFILE: {
      IS_SUCCESS: 'Get profile successfully'
    },
    UPLOAD_AVATAR: {
      IS_SUCCESS: 'Upload avatar successfully',
      IS_FAILED: 'Upload avatar failed'
    }
  },
  TASKS: {
    GET_TASKS: {
      IS_SUCCESS: 'Get tasks successfully'
    },
    CREATE_TASK: {
      IS_SUCCESS: 'Create new task successfully'
    },
    GET_TASK_BY_ID: {
      NOT_FOUND: 'Task ID not found',
      IS_SUCCESS: 'Get task by id successfully'
    },
    EDIT_TASK: {
      NOT_FOUND: 'Task ID not found',
      IS_SUCCESS: 'Edit task successfully',
      IS_FAILED: 'Edit task failed'
    },
    DELETE_TASK: {
      IS_DELETED: 'The task you are trying to delete no longer exists.',
      IS_SUCCESS: 'Delete task successfully',
      NOT_FOUND: 'Task ID not found'
    }
  }
}
