"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useCartStore } from "@/app/stores/useCartStore";
import { useParams } from "next/navigation";
import { ParamValue } from "next/dist/server/request/params";

const fetchProduct = async (id: ParamValue) => {
  const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return data;
};

export default function ProductDetail() {
  const params = useParams();
  const { addToCart } = useCartStore();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => fetchProduct(params.id),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">
        Error loading product. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative h-96 lg:h-[500px]">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>

          <div className="flex items-center space-x-4">
            <span className="text-2xl font-bold text-green-600">
              ${product.price}
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          {product.rating && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-gray-600">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>
            </div>
          )}

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <button
            onClick={() => addToCart(product)}
            className="cursor-pointer w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
