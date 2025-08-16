import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/Apierror/js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import multer from "multer";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req, res) => {
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
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverLocalPath = req.files?.coverImage[0]?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar file is missing");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  let coverImage = "";
  if (coverLocalPath) {
    coverImage = await uploadOnCloudinary(coverLocalPath);
  }

  //creating new user
  const user = await User.create({
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLoerCase(),
  });
  const createdUser=await User.findById(user._id).select('-password -refershToken')
  //using select to deselect(-) some fields that we don't require
  if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200,createdUser,'User registered successfully'))
});
export { registerUser };
