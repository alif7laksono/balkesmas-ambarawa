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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8">
            {/* Filter Component */}
            <div className="flex-1 min-w-0">
              <NewsFilter categories={categories} />
            </div>
          </div>
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
