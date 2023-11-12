import { ObjectId } from "mongodb";
import { ERoles, EVerify, IUser } from "../types/user.types";

class User {
  _id: ObjectId
  name: string;
  email: string;
  date_of_birth: Date;
  password: string;
  roles?: ERoles;
  verify?: EVerify;

  constructor(user: IUser) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.date_of_birth = user.date_of_birth;
    this.password = user.password;
    this.roles = user.roles || ERoles.User
    this.verify = user.verify || EVerify.Unverify
  }

}
