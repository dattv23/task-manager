export interface GetProfileBody {
  userId: string
}

export interface UploadAvatarBody {
  userId: string
}

export interface UserBody {
  fullName: string
  email: string
  password: string
  dateOfBirth: Date
  avatar: string
}
