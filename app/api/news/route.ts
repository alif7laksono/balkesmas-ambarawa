// app/api/news/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import { writeFile } from "fs/promises";
import path from "path";
import { validateFile } from "@/app/lib/fileUtils";
import Category from "@/app/models/Category";

interface NewsQuery {
  title?: { $regex: string; $options: string };
  category?: string;
  status: string;
}

// GET semua berita
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    // ✅ NEW: Pagination & Filter parameters
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const status = searchParams.get("status") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const sortBy = searchParams.get("sortBy") || "eventDate";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const skip = (page - 1) * limit;

    console.log("API Parameters:", { search, category, page, limit });

    // ✅ NEW: Build query object
    const query: NewsQuery = { status: "published" };

    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    // ✅ NEW: Get total count for pagination
    console.log("MongoDB Query:", JSON.stringify(query));
    const total = await News.countDocuments(query);

    // ✅ NEW: Get paginated data
    const news = await News.find(query)
      .populate("category", "name description")
      .sort({ [sortBy]: sortOrder === "desc" ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    console.log("Results:", news.length, "items found");

    return NextResponse.json({
      success: true,
      data: news,
      pagination: {
        // ✅ NEW: Pagination metadata
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

    return NextResponse.json({
      success: true,
      data: [],
      pagination: {
        page: 1,
        limit: 9,
        total: 0,
        totalPages: 0,
      },
    });
  }
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// POST buat berita baru
export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const status = (formData.get("status") as string) || "draft";
    const eventDate = formData.get("eventDate") as string; // ✅ NEW
    const file = formData.get("image") as File | null;

    if (!title || !content || !category || !file) {
      return NextResponse.json(
        { success: false, message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    // ✅ NEW: Generate unique slug
    let slug = generateSlug(title);
    let counter = 1;
    while (await News.findOne({ slug })) {
      slug = `${generateSlug(title)}-${counter}`;
      counter++;
    }

    // Simpan file ke public/uploads
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    await writeFile(filePath, buffer);

    // Buat URL untuk disimpan di DB
    const imageUrl = `/uploads/${fileName}`;

    // Auto generate excerpt (max 300 char)
    const createExcerpt = (
      htmlContent: string,
      maxLength: number = 160
    ): string => {
      // Remove HTML tags
      const plainText = htmlContent.replace(/<[^>]*>/g, "");

      // Trim and get first meaningful part
      const trimmed = plainText.trim();

      // Find a good breaking point (end of sentence or word)
      if (trimmed.length <= maxLength) return trimmed;

      // Try to break at sentence end
      const sentenceEnd = trimmed.substring(0, maxLength).lastIndexOf(".");
      if (sentenceEnd > maxLength * 0.5) {
        return trimmed.substring(0, sentenceEnd + 1);
      }

      // Try to break at word boundary
      const wordBoundary = trimmed.substring(0, maxLength).lastIndexOf(" ");
      if (wordBoundary > maxLength * 0.7) {
        return trimmed.substring(0, wordBoundary) + "...";
      }

      // Fallback: hard break with ellipsis
      return trimmed.substring(0, maxLength - 3) + "...";
    };

    const excerpt = createExcerpt(content, 160);

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

    const validation = validateFile(file);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, data: newNews });
  } catch (error) {
    console.error("❌ Error membuat berita:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat berita" },
      { status: 500 }
    );
  }
}
