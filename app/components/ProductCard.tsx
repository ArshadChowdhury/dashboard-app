"use client";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "../stores/useCartStore";

export default function ProductCard({ product }: any) {
  const { addToCart } = useCartStore();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-4"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-blue-600 line-clamp-2 mb-2">
            {product.title}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            ${product.price}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
