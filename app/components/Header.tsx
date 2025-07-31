"use client";
import Link from "next/link";
import { useCartStore } from "../stores/useCartStore";

export default function Header() {
  const { getCartItemCount } = useCartStore();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            E-Shop
          </Link>
          <div className="flex space-x-6">
            <Link href="/" className="hover:text-blue-200">
              Products
            </Link>
            <Link href="/add-product" className="hover:text-blue-200">
              Add Product
            </Link>
            <Link href="/cart" className="hover:text-blue-200 relative">
              Cart
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
