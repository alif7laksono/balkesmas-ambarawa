// app/api/files/images/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
  s3Client,
  generateFileKey,
  getPresignedUrl,
} from "@/app/lib/s3-config";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as string;
    const pathname = formData.get("pathname") as string;

    if (!file || !category || !pathname) {
      return NextResponse.json(
        { error: "File, category, and pathname are required" },
        { status: 400 }
      );
    }

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 1MB" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "File type not supported. Use JPEG, PNG, WebP, or AVIF" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const Key = generateFileKey("news", "images", file.name, "images");

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    });

    await s3Client.send(command);

    return NextResponse.json({
      message: "File uploaded successfully to S3",
      key: Key,
      url: await getPresignedUrl(Key),
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const pathname = searchParams.get("pathname");
    const imgname = searchParams.get("imgname");

    if (!category || !pathname || !imgname) {
      return NextResponse.json(
        { error: "Invalid parameters" },
        { status: 400 }
      );
    }

    const Key = `${category}/${pathname}/${imgname}`;
    const url = await getPresignedUrl(Key);

    return NextResponse.json({
      message: "File loaded successfully from S3",
      url: url,
    });
  } catch (error) {
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve file" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const pathname = searchParams.get("pathname");
    const imgname = searchParams.get("imgname");

    if (!category || !pathname || !imgname) {
      return NextResponse.json(
        { error: "Invalid parameters" },
        { status: 400 }
      );
    }

    const Key = `${category}/${pathname}/${imgname}`;
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key,
    });

    await s3Client.send(command);

    return NextResponse.json({
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
