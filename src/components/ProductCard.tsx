"use client"; // 👈 add this at the very top

import Link from "next/link";
import { Product, useCart } from "@/context/cartContext";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  return (
    <div className="border p-4 rounded-xl shadow hover:shadow-lg transition">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="h-40 w-full object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{product.title}</h3>
      <p className="text-gray-600">${product.price}</p>
      <div className="flex justify-between mt-2">
        <Link href={`/products/${product.id}`} className="text-blue-500">
          View
        </Link>
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-600 text-white px-2 py-1 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
