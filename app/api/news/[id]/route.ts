// app/api/news/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import { writeFile } from "fs/promises";
import path from "path";
import { deleteFile } from "@/app/lib/fileUtils";
import { createExcerpt } from "@/app/lib/excerptUtils";
import Category from "@/app/models/Category";

interface UpdateNewsData {
  title: string;
  content: string;
  category: string;
  status?: string;
  slug?: string;
  image?: string;
  excerpt?: string;
  eventDate: Date;
}

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

    console.log("📨 Received eventDate:", eventDate);
    console.log("📨 Received data:", { title, eventDate });

    // Cari berita yang akan diupdate
    const existingNews = await News.findById(id);
    if (!existingNews) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    // Data update
    const updateData: UpdateNewsData = {
      title,
      content,
      category,
      eventDate: new Date(eventDate),
    };

    if (slug) {
      updateData.slug = slug;
    }

    if (status) {
      updateData.status = status;
    }

    // Handle image upload jika ada file baru
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const timestamp = Date.now();
      const originalName = imageFile.name;
      const fileExtension = originalName.split(".").pop();
      const fileName = `news-${timestamp}.${fileExtension}`;

      // Simpan file ke public/uploads
      const uploadDir = path.join(process.cwd(), "public/uploads");
      const filePath = path.join(uploadDir, fileName);

      await writeFile(filePath, buffer);

      // Update image path
      updateData.image = `/uploads/${fileName}`;

      if (existingNews.image && existingNews.image.startsWith("/uploads/")) {
        await deleteFile(existingNews.image);
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

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    // ✅ Hapus file gambar terkait
    if (deletedNews.image && deletedNews.image.startsWith("/uploads/")) {
      await deleteFile(deletedNews.image);
    }

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
