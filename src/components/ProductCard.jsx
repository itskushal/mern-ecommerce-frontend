import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { toast } from "react-toastify";

export default function ProductCard({ product }) {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist when component mounts
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  // ❤️ Handle wishlist action
  const handleWishlist = () => {
    let updatedWishlist;

    const exists = wishlist.some((item) => item._id === product._id);

    if (exists) {
      updatedWishlist = wishlist.filter((item) => item._id !== product._id);
      toast.info(`${product.name} removed from wishlist ❤️`);
    } else {
      updatedWishlist = [...wishlist, product];
      toast.success(`${product.name} added to wishlist ❤️`);
    }

    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  // 📸 Fix: Support local uploaded image OR external URL
  const imageUrl = product.image
    ? product.image.startsWith("http")
      ? product.image
      : `http://localhost:5000${product.image}`
    : "https://via.placeholder.com/300";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="relative bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition overflow-hidden group"
    >
      {/* ❤️ Wishlist Icon */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-red-100 transition"
      >
        <Heart
          className={`w-5 h-5 ${
            isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
          }`}
        />
      </button>

      {/* 🖼️ Product Image */}
      <div className="overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg font-semibold text-gray-800">
        {product.name}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-sm line-clamp-2 mb-2">
        {product.description}
      </p>

      {/* ⭐ Rating + Price */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-yellow-500 font-semibold text-sm">⭐ 4.0</span>
        <span className="text-blue-600 font-bold text-lg">
          ₹{product.price}
        </span>
      </div>

      {/* 🛒 Add to Cart */}
      <button
        onClick={() => {
          const cart = JSON.parse(localStorage.getItem("cart")) || [];

          // If already in cart → increase quantity instead of duplicate
          const existing = cart.find((item) => item._id === product._id);

          if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
          } else {
            cart.push({ ...product, quantity: 1 });
          }

          localStorage.setItem("cart", JSON.stringify(cart));

          toast.success(`${product.name} added to cart 🛒`);
        }}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Add to Cart
      </button>
    </motion.div>
  );
}
