// app/api/news/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import { generateFileKey, getPresignedUrl } from "@/app/lib/s3-config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/app/lib/s3-config";
import { createExcerpt } from "@/app/lib/excerptUtils";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const status = (formData.get("status") as string) || "draft";
    const eventDate = formData.get("eventDate") as string;
    const file = formData.get("image") as File | null;

    if (!title || !content || !category || !file) {
      return NextResponse.json(
        { success: false, message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "Ukuran gambar maksimal 1MB" },
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
        {
          success: false,
          message:
            "Format gambar tidak didukung. Gunakan JPEG, PNG, WebP, atau AVIF",
        },
        { status: 400 }
      );
    }

    // Generate unique slug
    let slug = generateSlug(title);
    let counter = 1;
    while (await News.findOne({ slug })) {
      slug = `${generateSlug(title)}-${counter}`;
      counter++;
    }

    // Upload image to S3
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

    // Get presigned URL for the image
    const imageUrl = await getPresignedUrl(Key);
    const excerpt = createExcerpt(content, 160);

    // Create news with S3 URL
    const newNews = await News.create({
      title,
      content,
      category,
      excerpt,
      image: imageUrl,
      slug,
      status,
      eventDate: new Date(eventDate),
      date: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dibuat",
      data: newNews,
    });
  } catch (error) {
    console.error("❌ Error membuat berita:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat berita" },
      { status: 500 }
    );
  }
}
