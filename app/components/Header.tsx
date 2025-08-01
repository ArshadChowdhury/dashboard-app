"use client";
import Link from "next/link";
import { useCartStore } from "../stores/useCartStore";

export default function Header() {
  const { getCartItemCount } = useCartStore();

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link
            href="/"
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            E-Shop
          </Link>

          <div className="hidden md:flex space-x-8 items-center">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Products
            </Link>
            <Link
              href="/add-product"
              className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Add Product
            </Link>
            <Link href="/cart" className="relative inline-flex items-center">
              <div className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8"
                  />
                </svg>
                <span>Cart</span>
              </div>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {getCartItemCount()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Link href="/cart" className="relative inline-flex items-center">
              <div className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0h8"
                  />
                </svg>
              </div>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-bold">
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

{
  /* <Link href="/" className="text-2xl font-bold">
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
          </div> */
}
