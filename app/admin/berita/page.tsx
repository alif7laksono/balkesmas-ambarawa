// app/admin/berita/page.tsx

import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import Category from "@/app/models/Category";
import BeritaPageClient from "./BeritaPageClient";
import { NewsLean } from "@/app/utils/types";

// Fungsi untuk generate public URL dari imageKey
function getPublicImageUrl(imageKey: string | undefined): string {
  if (!imageKey) return "/uploads/default-news.jpg";

  // Jika sudah full URL, return langsung
  if (imageKey.startsWith("http")) {
    return imageKey;
  }

  // Jika dari S3, generate public URL
  if (process.env.S3_BUCKET_NAME && process.env.S3_ENDPOINT) {
    const endpoint = process.env.S3_ENDPOINT.replace("https://", "");
    return `https://${process.env.S3_BUCKET_NAME}.${endpoint}/${imageKey}`;
  }

  // Jika local file path
  if (imageKey.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_BASE_URL || ""}${imageKey}`;
  }

  return "/uploads/default-news.jpg";
}

export default async function BeritaPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  await connectDB();

  const news = await News.find()
    .populate({
      path: "category",
      model: Category,
    })
    .sort({ createdAt: -1 })
    .lean<NewsLean[]>();

  // Process data dengan URL gambar yang benar
  const processedNews = news.map((item: NewsLean) => ({
    ...item,
    imageKey: getPublicImageUrl(item.imageKey),
    _id: item._id.toString(),
    category: {
      ...item.category,
      _id: item.category._id.toString(),
    },
    createdAt: item.createdAt.toString(),
    updatedAt: item.updatedAt.toString(),
    eventDate: item.eventDate.toString(),
  }));

  // Debug log
  console.log("Processed news sample:", {
    title: processedNews[0]?.title,
    originalImageKey: news[0]?.imageKey,
    processedImageKey: processedNews[0]?.imageKey,
  });

  const serializedNews = JSON.parse(JSON.stringify(processedNews));

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Daftar Berita</h1>
      <BeritaPageClient news={serializedNews} />
    </div>
  );
}
