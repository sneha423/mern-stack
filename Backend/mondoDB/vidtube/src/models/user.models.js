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
  },
  { timestamps: true }//for createdat and updatedat
);
export const User = mongoose.model("User", userSchema); //good practice to store the user in upper pattern and singlular
//   with this we can import the model anytime and it will also give access to database features like query selection etc.
