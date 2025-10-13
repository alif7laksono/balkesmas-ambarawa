// app/api/news/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import {
  generateFileKey,
  getPresignedUrl,
  extractKeyFromUrl,
} from "@/app/lib/s3-config";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/app/lib/s3-config";
import { UpdateNewsData } from "@/app/utils/types";
import { createExcerpt } from "@/app/lib/excerptUtils";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const status = formData.get("status") as string;
    const slug = formData.get("slug") as string;
    const eventDate = formData.get("eventDate") as string;
    const imageFile = formData.get("image") as File | null;

    const existingNews = await News.findById(id);
    if (!existingNews) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    const updateData: UpdateNewsData = {
      title,
      content,
      category,
      eventDate: new Date(eventDate),
    };

    if (slug) updateData.slug = slug;
    if (status) updateData.status = status;

    // Handle image upload to S3 if new file provided
    if (imageFile && imageFile.size > 0) {
      // Validate new image
      if (imageFile.size > 1024 * 1024) {
        return NextResponse.json(
          { success: false, message: "Ukuran gambar maksimal 1MB" },
          { status: 400 }
        );
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/avif",
      ];
      if (!allowedTypes.includes(imageFile.type)) {
        return NextResponse.json(
          { success: false, message: "Format gambar tidak didukung" },
          { status: 400 }
        );
      }

      // Upload new image to S3
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const Key = generateFileKey("news", "images", File.name, "images");

      const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME!,
        Key,
        Body: buffer,
        ContentType: imageFile.type,
        ACL: "public-read",
      });

      await s3Client.send(command);
      updateData.image = await getPresignedUrl(Key);

      // Delete old image from S3 if it exists and is from S3
      if (
        existingNews.image &&
        existingNews.image.includes(process.env.S3_BUCKET_NAME!)
      ) {
        try {
          const oldKey = extractKeyFromUrl(existingNews.image);
          if (oldKey) {
            const deleteCommand = new DeleteObjectCommand({
              Bucket: process.env.S3_BUCKET_NAME!,
              Key: oldKey,
            });
            await s3Client.send(deleteCommand);
          }
        } catch (error) {
          console.error("Error deleting old image from S3:", error);
          // Continue with update even if delete fails
        }
      }
    }

    const excerpt = createExcerpt(content, 160);
    updateData.excerpt = excerpt;

    const updatedNews = await News.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("category");

    return NextResponse.json({
      success: true,
      message: "Berita berhasil diupdate",
      data: updatedNews,
    });
  } catch (error) {
    console.error("Error updating news:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const news = await News.findById(id);
    if (!news) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    // Delete image from S3 if it exists and is from S3
    if (news.image && news.image.includes(process.env.S3_BUCKET_NAME!)) {
      try {
        const key = extractKeyFromUrl(news.image);
        if (key) {
          const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: key,
          });
          await s3Client.send(deleteCommand);
        }
      } catch (error) {
        console.error("Error deleting image from S3:", error);
        // Continue with news deletion even if image delete fails
      }
    }

    // Delete news from database
    await News.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dihapus",
    });
  } catch (error) {
    console.error("Error deleting news:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
