"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/app/stores/useCartStore";
import { useState } from "react";
import { Product } from "@/app/common/common-type";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCartStore();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const truncateTitle = (title: string, maxLength = 30) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + "..."
      : title;
  };

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200">
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse bg-gray-200 w-full h-full"></div>
            </div>
          )}
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            className={`object-contain p-4 group-hover:scale-105 transition-transform duration-200 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-sm text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
            {truncateTitle(product.title)}
          </h3>

          <span className="text-sm">{product.category}</span>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center my-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(product.rating.rate)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-gray-600 ml-1">
                ({product.rating.count})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-medium text-gray-900">
                ${product.price}
              </span>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full mt-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-medium py-2 px-3 rounded-md transition-colors duration-200 cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
