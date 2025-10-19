// app/berita/[slug]/page.tsx

import React from "react";
import NewsComponent from "./NewsComponent";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let news = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/news/${slug}`,
      {
        cache: "no-store",
      }
    );

    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        news = data.data;
      }
    }
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Berita tidak ditemukan.
      </div>
    );
  }

  return <NewsComponent data={news} />;
}
