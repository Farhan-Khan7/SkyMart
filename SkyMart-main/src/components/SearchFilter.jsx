import React from "react";
import { Search, ChevronDown } from "lucide-react";

const SearchFilter = ({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}) => {
  return (
    <div className="neu mt-8 rounded-2xl p-4 sm:p-5">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6C6C6B]"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="neu-inset w-full h-14 rounded-2xl pl-12 pr-4 text-white placeholder:text-[#6C6C6B] outline-none transition"
          />
        </div>

        {/* Category */}
        <div className="relative w-full sm:w-full lg:w-60">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="neu-inset w-full h-14 appearance-none rounded-2xl px-4 pr-12 text-white outline-none transition cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="beauty">Beauty</option>
            <option value="fragrances">Fragrances</option>
            <option value="furniture">Furniture</option>
            <option value="groceries">Groceries</option>
          </select>

          <ChevronDown
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C6C6B] pointer-events-none"
          />
        </div>

        {/* Sort */}
        <div className="relative w-full sm:w-full lg:w-60">
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="neu-inset w-full h-14 appearance-none rounded-2xl px-4 pr-12 text-white outline-none transition cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>

          <ChevronDown
            size={20}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C6C6B] pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
