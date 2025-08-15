// id string pk
// likedVideo ObjectId videos
// likedBy ObjectId users
// comment ObjectId comments
// tweeted ObjectId tweets
// createdAt Date
// updatedAt Date
import mongoose, { Schema } from "mongoose";
const likeSchema=new Schema(
    {
        //either of video, comment or tweet will be assigned rest are null
        likedvideo:{
            type:Schema.Types.ObjectId,
            ref:"Video"
        },
        likedBy:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        comment:{
            type:Schema.Types.ObjectId,
            ref:"Comment"
        },
        tweeted:{
            type:Schema.Types.ObjectId,
            ref:"Tweet"
        },
    },
    {timestamps:true}
)
export const Liket=mongoose.model('Like',likeSchema)