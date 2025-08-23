import mongoose from "mongoose";
import { use } from "react";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotPasswordToken: { type: String }, //takes one copy and send it to the database and user/browser/email
  //then we grab it in the url and match it with the database through api
  forgotPasswordTokenExpiry: { type: Date },
  verifyToken: { type: String }, //takes one copy and send it to the database and user/browser/email
  //then we grab it in the url and match it with the database through api
  verifyTokenExpiry: { type: Date },
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
