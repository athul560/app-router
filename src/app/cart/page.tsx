"use client";
import { useCart } from "@/context/cartContext";

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart();

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Product Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-16 h-16 object-contain rounded"
                />
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-gray-600">${item.price}</p>
                  <p className="text-sm text-gray-500">
                    Subtotal: ${(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => removeFromCart(item.id, true)} // decrease
                  className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                >
                  -
                </button>
                <span className="px-3">{item.quantity || 1}</span>
                <button
                  onClick={() => addToCart(item)} // increase
                  className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 ml-4"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Total */}
          <div className="text-right font-bold text-xl mt-6">
            Total: ${total.toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
}


