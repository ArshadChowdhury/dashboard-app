"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import axiosInstance from "../lib/axios";

const fetchProducts = async (category = "") => {
  const url = category ? `/products/category/${category}` : "/products";
  const response = await axiosInstance.get(url);
  return response.data;
};

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: () => fetchProducts(selectedCategory),
  });

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredProducts = products?.filter((product: any) =>
    product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="h-12 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-100 aspect-square rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search and Filter Section */}
        <div className="py-6 border-b border-gray-200">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            onSearch={setSearchTerm}
          />
        </div>

        {/* Results Header */}
        <div className="py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-normal text-gray-900">
              {selectedCategory ? (
                <>
                  <span className="capitalize">
                    {selectedCategory.replace(/'/g, "'")}
                  </span>
                  <span className="text-gray-500 ml-2">
                    ({filteredProducts?.length || 0} items)
                  </span>
                </>
              ) : (
                <>
                  All Products
                  <span className="text-gray-500 ml-2">
                    ({filteredProducts?.length || 0} items)
                  </span>
                </>
              )}
            </h1>
          </div>

          <div className="mt-4 sm:mt-0 flex items-center space-x-4">
            <span className="text-sm text-gray-700">Sort by</span>
            <select className="text-sm border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              <option>Best Match</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Customer Reviews</option>
              <option>Newest</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {filteredProducts?.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredProducts?.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600 mb-4">
              Try different keywords or remove search filters
            </p>
            <button
              onClick={() => {
                setSelectedCategory("");
                setSearchTerm("");
              }}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
