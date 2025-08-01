"use client";

import { useCartStore } from "../stores/useCartStore";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } =
    useCartStore();

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart</h1>
        <p className="text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Your Cart</h1>

      <div className="space-y-4">
        {cart.map((item: any) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="relative w-20 h-20">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-center md:text-left">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center md:text-left">
                  ${item.price}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-gray-200 px-2 py-1 rounded cursor-pointer"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-gray-200 px-2 py-1 rounded cursor-pointer"
                >
                  +
                </button>
              </div>

              <div className="text-right">
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="cursor-pointer text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <div className="text-center md:text-right">
          <p className="text-2xl font-bold">
            Total: ${getCartTotal().toFixed(2)}
          </p>
          <button
            onClick={() => {
              setTimeout(() => {
                clearCart();
                toast.success("Your payment was successful !");
              }, 1500);
            }}
            className="cursor-pointer mt-4 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
