// id string pk
// title string
// description string
// video ObjectId[] videos
// owner ObjectId users
// createdAt Date
// updatedAt Date
import mongoose, { Schema } from "mongoose";
const playlistSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    video: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Video',
      },
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);
export const Playlist = mongoose.model("Playlist", playlistSchema);
