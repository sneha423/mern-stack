import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from 'dotenv'
dotenv.config()
//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response=await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
    console.log('file uploaded on cloudinary File src:'+response.url);
    //once thefile is uploaded we want to delete it from our server
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
    console.log('error on cloudinary',error);
    
    fs.unlinkSync(localFilePath);
    return null;
  }
};
const deleteFromCloudianry=async(publicId)=>{
  try{
    const result=await cloudinary.uploader.destroy(publicId)
  }catch(error){
    console.log('errro deleting from cloudinary',error);
    return null
    
  }
}
export { uploadOnCloudinary ,deleteFromCloudianry};
