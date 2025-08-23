import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/Apierror.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary,deleteFromCloudinary } from "../utils/cloudinary.js";


const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

  //TODO: get all videos based on query, sort, pagination
  const matchStage = {};

  if (query) {
    matchStage.title = { $regex: query, $options: "i" }; // search in title
  }

  if (isValidObjectId(userId)) {
    matchStage.owner = new mongoose.Types.ObjectId(userId); // filter by uploader
  }
  const videos = await Video.aggregate([
    {
      $match: matchStage,
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "ownerDetails",
      },
    },
    {
      $unwind: "$ownerDetails",
    },
    {
      $sort: {
        [sortBy||'createdAt']: sortType === "desc" ? -1 : 1,
      },
    },
    {
      $project: {
        title: 1,
        thumbnail: 1,
        views: 1,
        duration: 1,
        isPublished: 1,
        owner: {
          _id: "$ownerDetails._id",
          username: "$ownerDetails.username",
          avatar: "$ownerDetails.avatar",
        },
        createdAt: 1,
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "videos fetched successfully"));
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video
  if ([title, description].some((field) => field?.trim() === "")) {
    throw new ApiError(401, "tile and desc required");
  }
  const existedImage = await Video.findOne({
    $or: [{ title }, { description }],
  });
  if (existedImage) {
    throw new ApiError(401, "image with title or description already exists");
  }
  const videoLocalPath = req.files?.videofile?.[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
  if (!videoLocalPath) {
    throw new ApiError(401, "video file is missing");
  }
  let videofile;
  try {
    videofile = await uploadOnCloudinary(videoLocalPath);
  } catch (error) {
    console.log("error in uploading video file", error);
    throw new ApiError(401, "error in uploading video file");
  }
  let thumbnail;
  try {
    thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  } catch (error) {
    console.log("error in uploading thumbnail ", error);
    throw new ApiError(401, "error in uploading thumbnail");
  }
  try {
    const video = await Video.create({
      title,
      description,
      videofile: videofile?.url || "",
      thumbnail: thumbnail?.url || "",
      duration: videofile.duration,
      owner: req.user._id,
    });
    const createdVideo = await Video.findById(video._id).select(
      "-description"
    );
    if (!createdVideo) {
      throw new ApiError(
        401,
        "something went wrong during publishing the video"
      );
    }
    return res
      .status(200)
      .json(new ApiResponse(200, createdVideo, "video published successfully"));
  } catch (error) {
    if (thumbnail) {
      await deleteFromCloudinary(thumbnail.public_id);
    }
    if (videofile) {
      await deleteFromCloudinary(videofile.public_id);
    }
    throw new ApiError(500, "something went wrong while publishing video");
  }
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
  if (!videoId) {
    throw new ApiError(401, "video id is required");
  }
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(401, "video not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, video, "video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
  if (!videoId) {
    throw new ApiError(401, "video id is required");
  }
  const { title, description } = req.body;
  let thumbnailUrl;
  if (req.file?.path) {
    const uploadedThumbnail = await uploadOnCloudinary(req.file.path);
    thumbnailUrl = uploadedThumbnail?.url;
  }

  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
        thumbnail: thumbnailUrl,
      },
    },
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, video, "video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  //TODO: delete video
  if (!video) {
    throw new ApiError(400, "video id is required");
  }
  if (!video.owner.equals(req.user._id)) {
    throw new ApiError(403, "you are not allowed to modify this video");
  }
  await Video.findByIdAndDelete(videoId);
  return res.status(200).json(new ApiResponse(200, {}, "video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(400, "video not found");
  }
  const toggledVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        isPublished: !video.isPublished,
      },
    },
    { new: true }
  );
  return res.status(200).json(new ApiResponse(200,toggledVideo,'publish status toggled'))
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
