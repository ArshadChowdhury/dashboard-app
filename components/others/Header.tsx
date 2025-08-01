"use client";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/app/stores/useCartStore";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const { getCartItemCount } = useCartStore();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex justify-between items-center">
          <Link
            href="/"
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            E-Shop
          </Link>

          <div className="hidden md:flex gap-2 md:gap-8 items-center">
            <Link
              href="/products"
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
            <Link href="/cart" className="hidden md:flex relative items-center">
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

          <Drawer
            direction="right"
            open={mobileDrawerOpen}
            onOpenChange={setMobileDrawerOpen}
          >
            <DrawerContent className="min-h-screen">
              <DrawerHeader>
                <DrawerTitle className="flex justify-between items-center">
                  E-Shop
                  <X
                    onClick={() => setMobileDrawerOpen(false)}
                    className="w-5 h-5 cursor-pointer"
                  />
                </DrawerTitle>
                <DrawerDescription asChild>
                  <div className="flex flex-col gap-4 mt-4">
                    <Link
                      href="/products"
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                      onClick={() => setMobileDrawerOpen(false)}
                    >
                      Products
                    </Link>
                    <Link
                      href="/add-product"
                      className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                      onClick={() => setMobileDrawerOpen(false)}
                    >
                      Add Product
                    </Link>
                    <Link
                      href="/cart"
                      className="text-gray-700 font-medium flex relative items-center"
                      onClick={() => setMobileDrawerOpen(false)}
                    >
                      Cart
                      {getCartItemCount() > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                          {getCartItemCount()}
                        </span>
                      )}
                    </Link>
                  </div>
                </DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="md:hidden relative items-center"
          >
            {" "}
            <div className="flex items-center space-x-2 bg-blue-600 text-white px-2 py-2 rounded-md">
              <Menu className="w-5 h-5" />
            </div>
          </button>
          {/* </div> */}
        </nav>
      </div>
    </header>
  );
}
