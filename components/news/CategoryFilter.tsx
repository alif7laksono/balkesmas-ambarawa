"use client";

import { useRouter } from "next/navigation";
import { Category } from "@/app/utils/types";

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const currentCategory = new URLSearchParams(window.location.search).get(
    "category"
  );

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(window.location.search);

    if (categoryId) {
      params.set("category", categoryId);
    } else {
      params.delete("category");
    }

    // Reset to first page when changing category
    params.delete("page");

    router.replace(`/berita?${params.toString()}`);
  };

  return (
    <select
      value={currentCategory || ""}
      onChange={(e) => handleCategoryChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
    >
      <option value="">Semua Kategori</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}
