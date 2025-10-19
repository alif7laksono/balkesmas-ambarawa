// app/api/news/[slug]/route.ts

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import {
  extractKeyFromUrl,
  deleteFromS3,
  uploadToS3,
} from "@/app/lib/s3-config";
import { getPresignedUrl } from "@/app/lib/s3-config";
import { INews } from "@/app/utils/types";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();

    // 🔹 Beri tipe eksplisit pada hasil query
    const news = await News.findOne({ slug }).lean<INews>();

    if (!news) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    // 🔹 Generate presigned URL jika ada imageKey
    let imageUrl: string;
    if (news.imageKey) {
      try {
        imageUrl = await getPresignedUrl(news.imageKey);
      } catch (urlError) {
        console.error("❌ Gagal generate presigned URL:", urlError);
        imageUrl = `https://${
          process.env.S3_BUCKET_NAME
        }.${process.env.S3_ENDPOINT?.replace("https://", "")}/${news.imageKey}`;
      }
    } else {
      imageUrl = "/images/default-news.jpg";
    }

    const updatedNews = {
      ...news,
      imageKey: imageUrl,
    };

    return NextResponse.json({ success: true, data: updatedNews });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan server";
    console.error("❌ Error GET /api/news/[slug]:", message);
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const body = await req.json();

    const { title, content, category, status, eventDate, image } = body;

    const existingNews = await News.findOne({ slug });
    if (!existingNews) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    let imageKey = existingNews.image;
    // let newImageKey: string | null = null;
    const oldImageKey = existingNews.image
      ? extractKeyFromUrl(existingNews.image)
      : null;

    // ✅ Jika gambar berubah (artinya base64 baru dikirim)
    if (image && image.startsWith("data:image")) {
      console.log("🖼 Uploading new image to S3...");

      // Hapus dulu gambar lama dari S3 (jika ada)
      if (oldImageKey) {
        await deleteFromS3(oldImageKey);
      }

      const uploadResult = await uploadToS3(image, "news");
      if (!uploadResult.success) {
        console.error("❌ Upload gagal, rollback update.");
        return NextResponse.json(
          { success: false, message: "Gagal upload gambar baru ke S3" },
          { status: 500 }
        );
      }

      imageKey = uploadResult.url;
      // newImageKey = uploadResult.key;
    }

    // ✅ Update dokumen di MongoDB
    const updatedNews = await News.findOneAndUpdate(
      { slug },
      {
        title,
        content,
        category,
        status,
        eventDate,
        image: imageKey,
        updatedAt: new Date(),
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Berita berhasil diperbarui",
      data: updatedNews,
    });
  } catch (error) {
    console.error("❌ Error updating news:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();

    // Find the news first
    const news = await News.findOne({ slug });
    if (!news) {
      return NextResponse.json(
        { success: false, message: "Berita tidak ditemukan" },
        { status: 404 }
      );
    }

    // If the news has an image, delete it from S3
    if (news.imageKey) {
      try {
        await deleteFromS3(news.imageKey);
      } catch (err) {
        console.error("⚠️ Gagal menghapus gambar dari S3:", err);
      }
    }

    // Delete from MongoDB
    await News.deleteOne({ slug });

    return NextResponse.json({
      success: true,
      message: "Berita berhasil dihapus",
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Terjadi kesalahan server";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
