// app/berita/page.tsx

import NewsCard from "@/components/news/NewsCard";
import { News } from "@/app/utils/news";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import NewsFilter from "@/components/news/NewsFilter";

async function getNews() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

async function getCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

console.log("redeploy after added env");

export default async function NewsPage() {
  const { data } = await getNews();
  const categories = await getCategories();

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header dengan Filter */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            Berita Terbaru
          </h1>

          {/* Filter Component */}
          <NewsFilter categories={categories} />
        </div>

        {/* Grid Berita */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data && data.length > 0 ? (
            data.map((item: News) => (
              <NewsCard
                key={item._id}
                _id={item._id}
                title={item.title}
                content={item.excerpt}
                imageUrl={item.image}
                slug={item.slug}
                createdAt={item.createdAt}
                eventDate={item.eventDate}
              />
            ))
          ) : (
            <p className="text-gray-500">Belum ada berita tersedia.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
