import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response=cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
    console.log('file uploaded on cloudinary File src:'+response.url);
    //once thefile is uploaded we want to delete it from our server
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};
export { uploadOnCloudinary };
