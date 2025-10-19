// app/admin/berita/edit/[slug]/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import EditBeritaClient from "./EditBeritaClient";
import { Types } from "mongoose";

interface EditBeritaPageProps {
  params: Promise<{ slug: string }>;
}

// Fungsi untuk generate full image URL
function getFullImageUrl(imageKey: string | undefined): string {
  if (!imageKey) return "/uploads/default-news.jpg";

  if (imageKey.startsWith("http")) return imageKey;

  if (
    process.env.S3_BUCKET_NAME &&
    process.env.S3_ENDPOINT &&
    !imageKey.startsWith("/") &&
    !imageKey.startsWith("news/")
  ) {
    const endpoint = process.env.S3_ENDPOINT.replace("https://", "");
    return `https://${process.env.S3_BUCKET_NAME}.${endpoint}/${imageKey}`;
  }

  if (imageKey.startsWith("/")) {
    return `${process.env.NEXT_PUBLIC_BASE_URL || ""}${imageKey}`;
  }

  if (imageKey.startsWith("news/")) {
    return `${process.env.NEXT_PUBLIC_BASE_URL || ""}/${imageKey}`;
  }

  return "/uploads/default-news.jpg";
}

// Type untuk ObjectId dengan buffer (dari MongoDB)
interface ObjectIdWithBuffer {
  buffer: Buffer;
}

// Fungsi untuk mengonversi ObjectId/Buffer ke string dengan type safety
function convertObjectIdToString(
  id: string | Types.ObjectId | ObjectIdWithBuffer | undefined | null
): string {
  if (!id) return "";

  if (typeof id === "string") {
    return id;
  }

  if (id instanceof Types.ObjectId) {
    return id.toString();
  }

  // Handle ObjectId dengan buffer (dari lean() result)
  if (typeof id === "object" && "buffer" in id) {
    try {
      return new Types.ObjectId(id.buffer).toString();
    } catch {
      return "";
    }
  }

  // Fallback untuk tipe lain
  return String(id);
}

export default async function EditBeritaPage({ params }: EditBeritaPageProps) {
  const { slug } = await params;

  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  await connectDB();

  const news = await News.findOne({ slug }).populate("category");

  if (!news) {
    return <div className="p-6 text-red-600">Berita tidak ditemukan.</div>;
  }

  // Process data dengan konversi manual semua field
  const processedNews = {
    _id: convertObjectIdToString(news._id),
    title: news.title,
    content: news.content,
    excerpt: news.excerpt,
    imageKey: getFullImageUrl(news.imageKey),
    slug: news.slug,
    status: news.status,
    metaTitle: news.metaTitle || "",
    metaDescription: news.metaDescription || "",
    eventDate: news.eventDate.toISOString(),
    createdAt: news.createdAt.toISOString(),
    updatedAt: news.updatedAt.toISOString(),
    category: news.category
      ? {
          _id: convertObjectIdToString(news.category._id),
          name: news.category.name,
          description: news.category.description || "",
        }
      : { _id: "", name: "Unknown", description: "" },
  };

  console.log("Processed news for edit:", {
    title: processedNews.title,
    originalImageKey: news.imageKey,
    processedImageKey: processedNews.imageKey,
    category: processedNews.category,
  });

  return (
    <div className="container mx-auto px-6 py-10 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Edit Berita</h1>
      <EditBeritaClient news={processedNews} />
    </div>
  );
}
