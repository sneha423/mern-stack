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
  console.warn(req.files);
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
    .cookie('refreshtoken',refreshToken,options)
    .json(new ApiResponse(200,{user:loggedInUser,refreshToken,accessToken},'user logged in successfully'))

});

export { registerUser,loginUser };
