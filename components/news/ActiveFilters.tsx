"use client";

import { useRouter } from "next/navigation";

export default function ActiveFilters() {
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const hasActiveFilters =
    searchParams.has("category") || searchParams.has("search");

  const clearAllFilters = () => {
    router.replace("/berita");
  };

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(window.location.search);
    params.delete(key);
    router.replace(`/berita?${params.toString()}`);
  };

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-gray-600">Filter aktif:</span>

      {searchParams.get("search") && (
        <button
          onClick={() => removeFilter("search")}
          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
        >
          Pencarian: &apos;{searchParams.get("search")}&apos;
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {searchParams.get("category") && (
        <button
          onClick={() => removeFilter("category")}
          className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors"
        >
          Kategori: {searchParams.get("category")}
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      <button
        onClick={clearAllFilters}
        className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200 transition-colors"
      >
        Hapus Semua
      </button>
    </div>
  );
}
