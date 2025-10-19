// app/api/news/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import { generateFileKey, getPresignedUrl } from "@/app/lib/s3-config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/app/lib/s3-config";
import { createExcerpt } from "@/app/lib/excerptUtils";
import { NewsQuery, NewsLean } from "@/app/utils/types";
import { FlattenMaps, Types } from "mongoose";

// ✅ Type untuk hasil lean() dengan populate - WITHOUT ANY
interface PopulatedCategory {
  _id: Types.ObjectId;
  name: string;
  description?: string;
}

interface NewsLeanWithPopulate {
  _id: Types.ObjectId;
  title: string;
  content: string;
  excerpt: string;
  imageKey?: string;
  image?: string;
  slug: string;
  status: "draft" | "published" | "archived";
  metaTitle?: string;
  metaDescription?: string;
  date: Date;
  eventDate: Date;
  category: PopulatedCategory;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

// ✅ Type untuk FlattenMaps result
type NewsLeanResult = FlattenMaps<NewsLeanWithPopulate>;

// ✅ Helper function untuk convert ke NewsLean
export function convertToNewsLean(newsItem: NewsLeanResult): NewsLean {
  return {
    _id: newsItem._id?.toString() || "",
    title: newsItem.title,
    content: newsItem.content,
    excerpt: newsItem.excerpt,
    imageKey: newsItem.imageKey,
    image: newsItem.image,
    slug: newsItem.slug,
    status: newsItem.status,
    metaTitle: newsItem.metaTitle,
    metaDescription: newsItem.metaDescription,
    date: newsItem.date.toISOString(),
    eventDate: newsItem.eventDate.toISOString(),
    category: {
      _id: newsItem.category._id.toString(),
      name: newsItem.category.name,
      description: newsItem.category.description,
    },
    createdAt: newsItem.createdAt.toISOString(),
    updatedAt: newsItem.updatedAt.toISOString(),
    __v: newsItem.__v,
  };
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// ✅ GET all news - FIXED VERSION
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    console.log("Search Params : ", Object.fromEntries(searchParams));

    // Parameters
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    // const status = searchParams.get("status") || "published";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const sortBy = searchParams.get("sortBy") || "eventDate";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    // Build query
    const query: NewsQuery = { status: "published" };
    console.log("Query", query);
    if (search) query.title = { $regex: search, $options: "i" };

    if (category) query.category = category;
    console.log("Final Query :", JSON.stringify(query));

    // Get data
    const total = await News.countDocuments(query);
    console.log("Total Documents :", total);
    const news = await News.find(query)
      .populate("category", "name description")
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit)
      .lean();

    console.log("News Found :", News.length);

    // ✅ GENERATE FRESH SIGNED URLS untuk setiap item
    const newsWithFreshUrls = await Promise.all(
      (news as NewsLeanResult[]).map(async (newsItem) => {
        try {
          let imageKey: string;

          // ✅ Handle image URL dengan type safety
          if (newsItem.imageKey) {
            const freshimageKey = await getPresignedUrl(newsItem.imageKey);
            imageKey = freshimageKey;
          } else {
            // ✅ Default image
            imageKey = "/images/default-news.jpg";
          }

          return {
            ...convertToNewsLean(newsItem),
            imageKey: imageKey,
          };
        } catch (urlError) {
          console.error(
            "Error generating URL for news:",
            newsItem._id,
            urlError
          );

          // ✅ Fallback handling
          const newsLean = convertToNewsLean(newsItem);
          const publicUrl = newsItem.imageKey
            ? `https://${
                process.env.S3_BUCKET_NAME
              }.${process.env.S3_ENDPOINT?.replace("https://", "")}/${
                newsItem.imageKey
              }`
            : newsItem.image || "/images/default-news.jpg";

          return {
            ...newsLean,
            imageKey: publicUrl,
            image: publicUrl,
          };
        }
      })
    );

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
    console.error(
      "Error message:",
      error instanceof Error ? error.message : error
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack"
    );

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
// ✅ POST create news - FIXED
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

    const imageKey = generateFileKey("news", "images", file.name, "images");

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: imageKey,
      Body: buffer,
      ContentType: file.type,
      ACL: "public-read",
    });

    await s3Client.send(command);
    const excerpt = createExcerpt(content, 160);

    // ✅ Create news dengan imageKey saja, jangan simpan full URL
    const newNews = await News.create({
      title,
      content,
      category,
      excerpt,
      imageKey: imageKey, // ✅ Simpan key saja
      slug,
      status,
      eventDate: new Date(eventDate),
      date: new Date(),
    });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dibuat",
      data: {
        ...newNews.toObject(),
        imageKey: imageKey, // ✅ Kirim URL di response
        image: imageKey, // ✅ Untuk compatibility
      },
    });
  } catch (error) {
    console.error("❌ Error membuat berita:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat berita" },
      { status: 500 }
    );
  }
}
