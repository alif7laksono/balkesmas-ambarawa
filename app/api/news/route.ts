// app/api/news/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import { generateFileKey, getPresignedUrl } from "@/app/lib/s3-config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/app/lib/s3-config";
import { createExcerpt } from "@/app/lib/excerptUtils";
import { NewsQuery } from "@/app/utils/types";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ✅ GET all news
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    // ✅ Parameters dengan default values
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "published";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const sortBy = searchParams.get("sortBy") || "eventDate";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    console.log("🔗 API Parameters:", {
      search,
      category,
      status,
      page,
      limit,
    });

    // ✅ Build query object
    const query: NewsQuery = { status: "published" };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    // ✅ Get total count for pagination
    const total = await News.countDocuments(query);

    // ✅ Get paginated data
    const news = await News.find(query)
      .populate("category", "name description")
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    // ✅ GENERATE NEW PRESIGNED URLS untuk setiap news
    const newsWithFreshUrls = await Promise.all(
      news.map(async (newsItem) => {
        try {
          // Extract key dari S3 URL yang ada
          const key = newsItem.image
            .split("/")
            .slice(4)
            .join("/")
            .split("?")[0];

          // Generate new presigned URL
          const freshImageUrl = await getPresignedUrl(key);

          return {
            ...newsItem.toObject(),
            image: freshImageUrl,
          };
        } catch (urlError) {
          console.error(
            "Error generating URL for news:",
            newsItem._id,
            urlError
          );
          // Return original data jika error
          return newsItem.toObject();
        }
      })
    );

    console.log("✅ Results:", newsWithFreshUrls.length, "news found");

    return NextResponse.json({
      success: true,
      data: newsWithFreshUrls,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("❌ GET /api/news Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch news",
        data: [],
        pagination: {
          page: 1,
          limit: 9,
          total: 0,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      },
      { status: 500 }
    );
  }
}

// ✅ POST create news
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
