"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cartContext";

export default function Navbar() {
  const { cart } = useCart();

  return (
    <nav className="bg-black shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">HelCart</Link>
        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/cart" className="relative">
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-1 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
