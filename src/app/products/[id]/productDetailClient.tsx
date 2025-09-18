"use client";

import { Product, useCart } from "@/context/cartContext";

export default function ProductDetailClient({ product }: { product: Product }) {
  const { addToCart } = useCart();

  if (!product) {
    return <p className="text-red-500">Product not found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-8">
     
      <div className="flex justify-center items-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full max-w-md h-auto rounded-lg shadow-lg object-contain bg-gray-100 p-4"
        />
      </div>

     
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600 mt-4">{product.description}</p>
        <p className="text-2xl font-semibold mt-4">${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 mt-6 rounded-lg shadow-md transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

