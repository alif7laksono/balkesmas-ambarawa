// app/api/news/[id]/route.ts

// app/api/news/[id]/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import mongoose from "mongoose";

// GET detail berita
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "ID berita tidak valid" },
        { status: 400 }
      );
    }

    const news = await News.findById(id).populate(
      "category",
      "name description"
    );
    if (!news) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: news });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil detail berita" },
      { status: 500 }
    );
  }
}

// PUT update berita
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "ID berita tidak valid" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const updatedNews = await News.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedNews) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedNews });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Gagal mengupdate berita" },
      { status: 500 }
    );
  }
}

// DELETE hapus berita
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "ID berita tidak valid" },
        { status: 400 }
      );
    }

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dihapus",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus berita" },
      { status: 500 }
    );
  }
}
