// app/api/news/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import { writeFile } from "fs/promises";
import path from "path";
import mongoose from "mongoose";

// GET semua berita
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const query = search ? { title: { $regex: search, $options: "i" } } : {};
    const news = await News.find(query)
      .populate("category", "name description")
      .sort({ date: -1 });

    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil berita" },
      { status: 500 }
    );
  }
}

// POST buat berita baru
export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const category = formData.get("category") as string;
    const file = formData.get("image") as File | null;

    if (!title || !content || !category || !file) {
      return NextResponse.json(
        { success: false, message: "Data tidak lengkap" },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return NextResponse.json(
        { success: false, message: "ID kategori tidak valid" },
        { status: 400 }
      );
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
    const excerpt =
      content.substring(0, 300) + (content.length > 300 ? "..." : "");

    const newNews = await News.create({
      title,
      content,
      category,
      excerpt,
      image: imageUrl,
      date: new Date(),
    });

    return NextResponse.json({ success: true, data: newNews });
  } catch (error) {
    console.error("❌ Error membuat berita:", error);
    return NextResponse.json(
      { success: false, message: "Gagal membuat berita" },
      { status: 500 }
    );
  }
}
