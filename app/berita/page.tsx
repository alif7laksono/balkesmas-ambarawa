// app/berita/page.tsx
import NewsCard from "@/components/news/NewsCard";
import { News } from "@/app/utils/news";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import NewsFilter from "@/components/news/NewsFilter";
import { Category } from "@/app/utils/category";

async function getNews(category?: string, search?: string) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/news`;

  // Tambahkan query parameters jika ada
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (search) params.append("search", search);

  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  const res = await fetch(url, {
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

interface NewsPageProps {
  searchParams: {
    category?: string;
    search?: string;
  };
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const { category, search } = searchParams;

  // Fetch data dengan filter
  const { data } = await getNews(category, search);
  const categories = await getCategories();

  console.log("Filter aktif:", { category, search });
  console.log("Jumlah berita yang difetch:", data?.length);

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

        {/* Info Filter Aktif */}
        {(category || search) && (
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              Menampilkan hasil untuk:
              {category &&
                ` Kategori: ${
                  categories.find((c: Category) => c._id === category)?.name
                }`}
              {search && ` Pencarian: "${search}"`}
            </p>
          </div>
        )}

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
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                {category || search
                  ? "Tidak ada berita yang sesuai dengan filter yang dipilih."
                  : "Belum ada berita tersedia."}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
