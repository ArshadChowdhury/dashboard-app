"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import axiosInstance from "@/app/lib/axios";
import CategoryFilter from "@/components/others/CategoryFilter";
import ProductCard from "@/components/others/ProductCard";
import Pagination from "@/components/others/Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "../common/common-type";

const fetchProducts = async (category = "") => {
  try {
    const url = category ? `/products/category/${category}` : "/products";
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [sortOption, setSortOption] = useState("Best Match");
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
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product: Product) =>
      product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [products, debouncedSearchTerm]);

  // Sort the filtered products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];

    switch (sortOption) {
      case "Price: Low to High":
        return sorted.sort((a, b) => a.price - b.price);
      case "Price: High to Low":
        return sorted.sort((a, b) => b.price - a.price);
      case "Customer Reviews (Positive)":
        return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
      case "Customer Reviews (Negative)":
        return sorted.sort((a, b) => a.rating.rate - b.rating.rate);
      default:
        return sorted;
    }
  }, [filteredProducts, sortOption]);

  // Paginate the sorted list
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, currentPage]);

  if (isLoading) {
    return (
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mx-auto mb-6"></div>
            <div className="h-12 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {[...Array(4)].map((_, i) => (
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
            <h1 className="text-2xl text-center lg:text-left font-normal text-gray-900">
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

          <div className="mt-4 sm:mt-0 flex justify-center items-center gap-4">
            <span className="text-sm text-gray-700">Sort by</span>
            <Select
              value={sortOption} // Controlled component: display the current value
              onValueChange={(value) => {
                // Shadcn Select uses onValueChange
                setSortOption(value);
                setCurrentPage(1); // reset to page 1 on sort change
              }}
            >
              <SelectTrigger className="w-[180px]">
                {/* The placeholder will show if sortOption is empty/null, otherwise the selected value */}
                <SelectValue placeholder="Select a sort option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Best Match">Best Match</SelectItem>
                <SelectItem value="Price: Low to High">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="Price: High to Low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="Customer Reviews (Positive)">
                  Customer Reviews (Positive)
                </SelectItem>
                <SelectItem value="Customer Reviews (Negative)">
                  Customer Reviews (Negative)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="pb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {paginatedProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page: number) => setCurrentPage(page)}
          />
        )}

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
