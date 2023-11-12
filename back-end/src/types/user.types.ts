import { ObjectId } from "mongodb";

export enum ERoles {
      User = "USER",
      Admin = "ADMIN"
}

export enum EVerify {
      Verify = "VERIFY",
      Unverify = "UNVERIFY",
      Ban = "Ban"
}

export interface IUser {
      _id: ObjectId,
      name: string,
      email: string,
      date_of_birth: Date,
      password: string,
      roles?: ERoles,
      verify?: EVerify
}