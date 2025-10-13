// components/news/NewsFilter.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/app/utils/types";

interface NewsFilterProps {
  categories: Category[];
}

export default function NewsFilter({ categories }: NewsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (category) params.set("category", category);

    const queryString = params.toString();
    const newUrl = queryString ? `/berita?${queryString}` : "/berita";

    console.log("🔗 Navigating to:", newUrl);
    router.push(newUrl, { scroll: false });
  }, [search, category, router]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    router.push("/berita", { scroll: false });
  };

  const hasActiveFilters = search || category;

  // Helper function untuk find category name
  const getCategoryName = (categoryId: string): string => {
    const foundCategory = categories.find(
      (c: Category) => c._id === categoryId
    );
    return foundCategory?.name || "Unknown Category";
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cari Berita
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul berita..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter Kategori
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="">Semua Kategori</option>
            {categories.map((cat: Category) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button and Active Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
        {/* Clear Filters Button */}
        <div>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
            >
              Hapus Semua Filter
            </button>
          )}
        </div>

        {/* Active Filters Badge */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {search && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Pencarian: &quot;{search}&quot;
                <button
                  onClick={() => setSearch("")}
                  className="ml-2 hover:text-blue-600 text-sm"
                >
                  ×
                </button>
              </span>
            )}
            {category && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Kategori: {getCategoryName(category)}
                <button
                  onClick={() => setCategory("")}
                  className="ml-2 hover:text-green-600 text-sm"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
