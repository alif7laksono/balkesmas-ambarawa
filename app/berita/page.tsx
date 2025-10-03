// app/berita/page.tsx
import NewsCard from "@/components/news/NewsCard";
import { News } from "@/app/utils/news";

async function getNews() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

export default async function NewsPage() {
  const { data } = await getNews(); // ✅ ambil "data" dari response

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Berita Terbaru
      </h1>

      {/* Grid List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data && data.length > 0 ? (
          data.map((item: News) => (
            <NewsCard
              key={item._id}
              _id={item._id}
              title={item.title}
              content={item.content}
              imageUrl={item.imageUrl}
              createdAt={item.createdAt}
            />
          ))
        ) : (
          <p className="text-gray-500">Belum ada berita tersedia.</p>
        )}
      </div>
    </div>
  );
}
