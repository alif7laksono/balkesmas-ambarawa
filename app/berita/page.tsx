// app/berita/page.tsx

import NewsCard from "@/components/news/NewsCard";
import { News } from "@/app/utils/types";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import NewsFilter from "@/components/news/NewsFilter";
import { Category } from "@/app/utils/types";
import Link from "next/link";

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

  try {
    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(
        `Failed to fetch categories: ${res.status} ${res.statusText}`
      );
    }

    const data = await res.json();
    return data.data || data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Return empty array as fallback
    return [];
  }
}

// Error boundary component for better error display
function NewsError({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">❌</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Terjadi Kesalahan
        </h3>
        <p className="text-gray-600 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Coba Lagi
          </button>
        )}
      </div>
    </div>
  );
}

// Loading component
function NewsLoading() {
  return (
    <div className="text-center py-12">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">⏳</div>
        <p className="text-gray-600">Memuat berita...</p>
      </div>
    </div>
  );
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  try {
    const { category, search } = await searchParams;

    // Fetch data with error handling
    let newsData;
    let categories: Category[] = [];

    try {
      [newsData, categories] = await Promise.all([
        getNews(category, search),
        getCategories(),
      ]);
    } catch (error) {
      console.error("Error in data fetching:", error);
      // Continue with fallback data
      newsData = { data: [], pagination: null };
    }

    // Handle null or undefined data
    const data = newsData?.data || [];
    const pagination = newsData?.pagination || null;

    // Validate data structure
    if (!Array.isArray(data)) {
      console.error("Invalid data format received:", newsData);
      return (
        <div>
          <Navbar />
          <div className="max-w-7xl mx-auto px-6 py-12">
            <NewsError message="Format data tidak valid. Silakan coba lagi nanti." />
          </div>
          <Footer />
        </div>
      );
    }

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
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-blue-800 font-medium">
                      Menampilkan hasil filter:
                    </p>
                    {category && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Kategori: {getCategoryName(category)}
                      </span>
                    )}
                    {search && (
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Pencarian: &quot;{search}&quot;
                      </span>
                    )}
                  </div>
                  <p className="text-blue-600 text-sm font-medium">
                    Ditemukan {pagination?.total || data.length} berita
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Grid Berita with proper error and empty states */}
          {data.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item: News) => (
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
                ))}
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
            </>
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
                  <p className="text-gray-400 text-sm mb-4">
                    Coba ubah filter atau hapus filter untuk melihat semua
                    berita
                  </p>
                )}
                {!(category || search) && (
                  <div className="space-y-2">
                    <p className="text-gray-400 text-sm">
                      Silakan periksa kembali nanti atau
                    </p>
                    <Link
                      href="/"
                      className="inline-block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      Kembali ke Beranda
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    // Global error boundary for the entire page
    console.error("Error in NewsPage:", error);

    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12">
          <NewsError message="Terjadi kesalahan saat memuat halaman berita. Silakan refresh halaman atau coba lagi nanti." />
        </div>
        <Footer />
      </div>
    );
  }
}
