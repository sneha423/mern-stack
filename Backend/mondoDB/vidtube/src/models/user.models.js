// id string pk
// name string
// watchHistory ObjectId[] videos
// liked ObjectId[] likes
// password string
// avatar string
// email string
// createdAt Date
// updatedAt Date
import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new Schema(
  {
    //id will be genrated automatically by mongodb
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "password id required"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String, //cloudinary url
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId, //to get something from other model
        ref: "Video",
      },
    ],
    refreshtoken: {},
  },
  { timestamps: true } //for createdat and updatedat
);
//methods in mongoose
//1. encrypt the password
userSchema.pre("save", async function (next) {
  if (!this.modified("password")) return next();
  this.password = bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.isPasswordcorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.methods.generateAccessToken = function () {
  //short lived access token
  jwt.sign(
    { _id: this._id, email: this.email, username: this.username },
    process.env.ACCESS_TOKEN_SECRET,{expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
  );
}; 
userSchema.methods.generateRefeshToken = function () {
  //short lived access token
  jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET,{expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
  );
}; 
export const User = mongoose.model("User", userSchema); //good practice to store the user in upper pattern and singlular
//   with this we can import the model anytime and it will also give access to database features like query selection etc.
