import { Category } from "@/app/utils/types";
import SearchFilter from "../SearchFilter";
import CategoryFilter from "../CategoryFilter";
import ActiveFilters from "../ActiveFilters";

interface NewsFilterProps {
  categories: Category[];
}

export default function NewsFilter({ categories }: NewsFilterProps) {
  return (
    <div className="space-y-4">
      {/* Search and Category Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <SearchFilter />
        </div>
        <div className="sm:w-64">
          <CategoryFilter categories={categories} />
        </div>
      </div>

      {/* Active Filters Display */}
      <ActiveFilters />
    </div>
  );
}
