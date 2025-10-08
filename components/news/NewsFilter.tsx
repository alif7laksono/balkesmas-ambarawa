// components/news/NewsFilter.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface Category {
  _id: string;
  name: string;
}

interface NewsFilterProps {
  categories: Category[];
}

export default function NewsFilter({ categories }: NewsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");

  // ✅ DEBUG: Log categories untuk pastikan data benar
  useEffect(() => {
    console.log("📋 Available categories:", categories);
  }, [categories]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (category) params.set("category", category);

    const queryString = params.toString();
    const newUrl = queryString ? `/berita?${queryString}` : "/berita";

    console.log("🔗 Navigating to:", newUrl); // ✅ DEBUG
    router.push(newUrl, { scroll: false });
  }, [search, category, router]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    router.push("/berita", { scroll: false });
  };

  const hasActiveFilters = search || category;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters */}
        <div className="flex items-end">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="w-full md:w-auto px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Hapus Filter
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Badge */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap gap-2">
          {search && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Pencarian: &quot;{search}&quot;
              <button
                onClick={() => setSearch("")}
                className="ml-2 hover:text-blue-600"
              >
                ×
              </button>
            </span>
          )}
          {category && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              Kategori: {categories.find((c) => c._id === category)?.name}
              <button
                onClick={() => setCategory("")}
                className="ml-2 hover:text-green-600"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
