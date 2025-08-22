import jwt from "jsonwebtoken";
import { ApiError } from "../utils/Apierror.js";
import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const verifyJWT = asyncHandler(async (req, _, next) => {
  const token =
    req.cookies.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "unauthorized");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshtoken"
    );
    if (!user) {
      throw new ApiError(401, "unauthorized");
    }
    req.user = user;
    next(); //transefr the flow control from one middleware to other
  } catch (error) {
    throw new ApiError(401, error?.mesaage || "Invalid access token");
  }
});
