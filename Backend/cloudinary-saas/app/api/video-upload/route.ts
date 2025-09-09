import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary, UploadStream } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { Buffer } from "buffer";
import { error } from "console";
import { PrismaClient } from "@/app/generated/prisma";
const prisma = new PrismaClient();
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: unknown;
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  try {
    if (!userId) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "cloudinary credentials not found" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const originalSize = formData.get("originalSize") as string; //this cannot be grabbed directly

    if (!file) {
      return NextResponse.json({ error: "file not found" }, { status: 401 });
    }
    //fixed steps
    const bytes = await file?.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "video-uploads",
            transformation: [{ quality: "auto", fetch_format: "mp4" }],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as CloudinaryUploadResult);
          }
        );
        uploadStream.end(buffer);
      }
    );
    //now connect to prisma
    const video = await prisma.video.create({
      data: {
        title,
        description,
        publicId: result.public_id,
        originalSize: originalSize,
        compressSize: String(result.bytes),
        duration: result.duration || 0,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "upload video failed" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
