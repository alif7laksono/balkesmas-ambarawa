// app/admin/berita/page.tsx

import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import { connectDB } from "@/app/lib/mongodb";
import News from "@/app/models/News";
import Category from "@/app/models/Category";
import BeritaPageClient from "./BeritaPageClient";

export default async function BeritaPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  await connectDB();

  const news = await News.find()
    .populate({
      path: "category",
      model: Category, // Specify model explicitly
    })
    .sort({ createdAt: -1 });

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Daftar Berita</h1>
      <BeritaPageClient news={JSON.parse(JSON.stringify(news))} />
    </div>
  );
}
