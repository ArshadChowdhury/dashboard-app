"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/lib/axios";

const fetchCategories = async () => {
  try {
    const { data } = await axiosInstance.get("products/categories");
    return data;
  } catch (error) {
    console.error(error);
  }
};

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: React.Dispatch<React.SetStateAction<string>>;
  onSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  onSearch,
}: CategoryFilterProps) {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      {/* Quick Category Pills */}
      <div className="hidden mb-6 lg:flex justify-center flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("")}
          className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === ""
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {!isLoading &&
          categories?.slice(0, 4).map((category: string) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.replace(/'/g, "'")}
            </button>
          ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Search Bar */}
        <div className="flex-1">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for products, brands, categories..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 md:text-lg"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="lg:hidden lg:w-80">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14-7l-7 7-7-7m14 18l-7-7-7 7"
                />
              </svg>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full pl-12 pr-10 py-4 text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 md:text-lg bg-white appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {!isLoading &&
                categories?.map((category: string) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() +
                      category.slice(1).replace(/'/g, "'")}
                  </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
