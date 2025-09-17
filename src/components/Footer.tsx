"use client";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h2 className="text-white text-xl font-bold mb-4">MyShop</h2>
          <p className="text-gray-400">
            Your one-stop online store for the latest products and amazing deals.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/products" className="hover:text-white">Products</a></li>
            <li><a href="/about" className="hover:text-white">About Us</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white font-semibold mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white">FAQ</a></li>
            <li><a href="#" className="hover:text-white">Support</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-400">123 Main Street, City, Country</p>
          <p className="text-gray-400">email@example.com</p>
          <p className="text-gray-400">+1 234 567 890</p>
          <div className="flex space-x-3 mt-4">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
}
