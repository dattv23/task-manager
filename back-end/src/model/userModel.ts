import { Schema, model } from "mongoose";

const userSchema = new Schema({
      name: String,
      email: String,
      password: String,
      date_of_birth: Date
});

const User = model('User', userSchema);
export default User;