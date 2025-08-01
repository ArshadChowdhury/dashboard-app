// "use client";
// import { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import ProductCard from "./components/ProductCard";
// import CategoryFilter from "./components/CategoryFilter";

// const fetchProducts = async (category = "") => {
//   const url = category
//     ? `https://fakestoreapi.com/products/category/${category}`
//     : "https://fakestoreapi.com/products";
//   const { data } = await axios.get(url);
//   return data;
// };

// export default function Home() {
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

//   const {
//     data: products,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["products", selectedCategory],
//     queryFn: () => fetchProducts(selectedCategory),
//   });

//   // Debounce search
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setDebouncedSearchTerm(searchTerm);
//     }, 300);
//     return () => clearTimeout(timer);
//   }, [searchTerm]);

//   const filteredProducts = products?.filter((product: any) =>
//     product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
//   );

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <div className="flex justify-center items-center min-h-96 pt-20">
//           <div className="flex flex-col items-center space-y-4">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
//             <p className="text-gray-600 font-medium">Loading products...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
//           <div className="text-red-500 text-6xl mb-4">⚠️</div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Oops! Something went wrong
//           </h2>
//           <p className="text-gray-600 mb-4">
//             We couldn't load the products. Please try again later.
//           </p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-16 mb-8">
//         <div className="container mx-auto px-4 text-center">
//           <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
//             Discover Amazing Products
//           </h1>
//           <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
//             Shop the latest trends with unbeatable prices and premium quality
//           </p>
//         </div>
//       </div>

//       <div className="container mx-auto px-4">
//         <CategoryFilter
//           selectedCategory={selectedCategory}
//           onCategoryChange={setSelectedCategory}
//           onSearch={setSearchTerm}
//         />

//         {/* Results Header */}
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">
//               {selectedCategory
//                 ? `${
//                     selectedCategory.charAt(0).toUpperCase() +
//                     selectedCategory.slice(1)
//                   } Products`
//                 : "All Products"}
//             </h2>
//             <p className="text-gray-600 mt-1">
//               {filteredProducts?.length || 0} products found
//             </p>
//           </div>

//           <div className="hidden md:flex items-center space-x-4">
//             <span className="text-sm text-gray-600">Sort by:</span>
//             <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
//               <option>Featured</option>
//               <option>Price: Low to High</option>
//               <option>Price: High to Low</option>
//               <option>Customer Rating</option>
//             </select>
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-16">
//           {filteredProducts?.map((product: any) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>

//         {/* Empty State */}
//         {filteredProducts?.length === 0 && (
//           <div className="text-center py-16">
//             <div className="text-8xl mb-4">🔍</div>
//             <h3 className="text-2xl font-bold text-gray-800 mb-2">
//               No products found
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Try adjusting your search or filter criteria
//             </p>
//             <button
//               onClick={() => {
//                 setSelectedCategory("");
//                 setSearchTerm("");
//               }}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Clear Filters
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import CategoryFilter from "./components/CategoryFilter";

const fetchProducts = async (category = "") => {
  const url = category
    ? `https://fakestoreapi.com/products/category/${category}`
    : "https://fakestoreapi.com/products";
  const { data } = await axios.get(url);
  return data;
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
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
