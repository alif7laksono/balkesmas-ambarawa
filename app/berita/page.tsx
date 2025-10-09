// app/berita/page.tsx
import NewsCard from "@/components/news/NewsCard";
import { News } from "@/app/utils/news";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import NewsFilter from "@/components/news/NewsFilter";
import { Category } from "../utils/category";

async function getNews(category?: string, search?: string) {
  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/news`;

  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (search) params.append("search", search);

  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  console.log("🔗 Fetching from:", url);

  const res = await fetch(url, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
}

async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.data || data; // Sesuaikan dengan response structure API Anda
}

// interface NewsPageProps {
//   searchParams: {
//     category?: string;
//     search?: string;
//   };
// }

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  // Await dan destructure sekaligus
  const { category, search } = await searchParams;

  const newsData = await getNews(category, search);
  const categories = await getCategories();

  const data = newsData.data;
  const pagination = newsData.pagination;

  // Helper function untuk find category name
  const getCategoryName = (categoryId: string): string => {
    const foundCategory = categories.find(
      (c: Category) => c._id === categoryId
    );
    return foundCategory?.name || "Unknown Category";
  };

  console.log("🔍 Filter aktif:", { category, search });
  console.log("📊 Jumlah berita:", data?.length);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 lg:gap-8 mb-6">
            {/* Filter Component */}
            <div className="flex-1 min-w-0">
              <NewsFilter categories={categories} />
            </div>
          </div>

          {/* Info Filter Aktif */}
          {(category || search) && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-blue-800 font-medium">
                  Menampilkan hasil filter:
                  {category && (
                    <span className="ml-2 bg-blue-100 px-2 py-1 rounded">
                      Kategori: {getCategoryName(category)}
                    </span>
                  )}
                  {search && (
                    <span className="ml-2 bg-blue-100 px-2 py-1 rounded">
                      Pencarian: &apos;{search}&apos;
                    </span>
                  )}
                </p>
                <p className="text-blue-600 text-sm">
                  Ditemukan {pagination?.total || data.length} berita
                </p>
              </div>
            </div>
          )}
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
                category={item.category?.name}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">📰</div>
                <p className="text-gray-500 text-lg mb-2">
                  {category || search
                    ? "Tidak ada berita yang sesuai dengan filter"
                    : "Belum ada berita tersedia"}
                </p>
                {(category || search) && (
                  <p className="text-gray-400 text-sm">
                    Coba ubah filter atau hapus filter untuk melihat semua
                    berita
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pagination Info */}
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-8 text-center text-gray-600">
            <p>
              Halaman {pagination.page} dari {pagination.totalPages}(
              {pagination.total} total berita)
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
