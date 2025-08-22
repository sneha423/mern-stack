import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Apierror.js";
import { User } from "../models/user.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudianry,
} from "../utils/cloudinary.js";
import multer from "multer";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";
import jwt from "jsonwebtoken";
import { channel } from "diagnostics_channel";
import mongoose from "mongoose";
const generateAccessASndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("user not found");
      throw new ApiError(500, "user not found!");
    } else {
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      user.refreshtoken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    }
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong in generating access or refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  console.log("📂 Files received by multer:", req.files);
  console.log("📝 Body received:", req.body);
  console.log("📂 Files received by multer:", req.files);
  const { email, password, username } = req.body;
  //validation
  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "all fields are required");
  }
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new ApiError(400, "user with email or username already exists");
  }
  // console.warn(req.files);
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  const coverLocalPath = req.files?.coverImage?.[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is missing");
  }

  // const avatar = await uploadOnCloudinary(avatarLocalPath);
  // let coverImage = "";
  // if (coverLocalPath) {
  //   coverImage = await uploadOnCloudinary(coverLocalPath);
  // }

  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log("uploaded avatar", avatar);
  } catch (error) {
    console.log("error uploading avatar", error);
    throw new ApiError(500, "failed to upload avatar");
  }

  let coverImage;
  try {
    coverImage = await uploadOnCloudinary(coverLocalPath);
    console.log("uploaded cover image", coverImage);
  } catch (error) {
    console.log("error uploading cover image", error);
    throw new ApiError(500, "failed to upload coverimage");
  }

  //creating new user
  try {
    const user = await User.create({
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase(),
    });
    const createdUser = await User.findById(user._id).select(
      "-password -refershToken"
    );
    //using select to deselect(-) some fields that we don't require
    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }
    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  } catch (error) {
    console.log("user creation failed");
    if (avatar) {
      await deleteFromCloudianry(avatar.public_id);
    }
    if (coverImage) {
      await deleteFromCloudianry(coverImage.public_id);
    }
    throw new ApiError(
      500,
      "something went wrong while registring a user and images were deleted"
    );
  }
});

const loginUser = asyncHandler(async (req, res) => {
  //get data from body
  const { username, email, password } = req.body;
  //validation
  if (!email) {
    throw new ApiError(400, "email is required");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "user not found");
  }
  //validate password
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(501, "invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessASndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );
  // if(!loggedInUser){

  // }
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshtoken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, refreshToken, accessToken },
        "user logged in successfully"
      )
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refershToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "refresh token is required");
  }
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "invalid refresh token");
    }
    if (incomingRefreshToken !== user?.refreshtoken) {
      throw new ApiError(401, "invalid refersh token");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };
    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessASndRefreshToken(user._id);
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refershToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while refreshing the access token"
    );
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    //we can't directly fetch this
    //we need to know who is logged in
    //come back after middleware part
    // req.user._id

    req.user._id,
    {
      $set: {
        refreshtoken: undefined,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshtoken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});
/*basic steps of these CRUD operations:
get data from user
validate it 
write function for updation
*/
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Old password is incorrect");
  }
  user.password = newPassword; //it will automatically encrypt the password using pre hook in user model.js
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user details"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "username and email are required");
  }
  const user = await User.findByIdAndUpdate(
    req.uer?._id,
    {
      $set: {
        username,
        email,
      },
    },
    { new: true } //we do this if we want our updated info to come
  ).select("-password -refreshtoken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "account details updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(401, "File is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  if (!avatar.url) {
    throw new ApiError(401, "something went wrong while uploading avatar");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password -refreshtoken");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "avatar updated successfully"));
});

const updateUserCoverImage = asyncHandler(async (req, res) => {
  const coverImageLocalPath = req.file?.path;
  if (!coverImageLocalPath) {
    throw new ApiError(401, "File is required");
  }
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  if (!coverImage.url) {
    throw new ApiError(401, "something went wrong while uploading coverImage");
  }
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  ).select("-password -refreshtoken");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "coverImage updated successfully"));
});

//use of database aggregation pipeline
const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  if (!username?.trim()) {
    throw new ApiError(400, "username is required");
  }
  const channel = await User.aggregate([
    {
      $match: {
        username: username.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "Subscription",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "Subsciption",
        localField: "_id",
        foreignField: "subscriber",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
        channelsSubscribedTo: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          if: {
            $in: [req.user?._id, "$subscribers.subscriber"],
          },
          then: true,
          else: false,
        },
      },
    },
    {
      //project only the necessary data
      $project: {
        username: 1,
        avatar: 1,
        subscribersCount: 1,
        channelsSubscribedTo: 1,
        coverImage: 1,
        email: 1,
        isSubscribed: 1,
      },
    },
  ]);
  if (!channel?.length) {
    throw new ApiError(400, "channel not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "channel profile fetched successfully")
    );
});

const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user?._id),
      },
    },
    {
      $lookup: {
        from: "Video",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "User",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);
  if (!user) {
    throw new ApiError(400, "user not found");
  }
  return res
    .status(200)
    .json(200, user[0]?.watchHistory, "Watch history fetched successfully");
});
export {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
  changeCurrentPassword,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
  getCurrentUser,
  getUserChannelProfile,
  getWatchHistory,
};
