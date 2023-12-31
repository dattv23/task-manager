export interface LoginBody {
  email: string
  password: string
}

export interface RegisterBody {
  name: string
  email: string
  password: string
  confirm_password: string
  // date_of_birth: string
}

export interface VerifyUserBody {
  email: string
  code: string
}

export interface ResendVerifyUserBody {
  email: string
}
