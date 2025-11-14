import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const isLoggedIn = !!localStorage.getItem("token");

  // ✅ Watch localStorage for Cart and Wishlist changes
  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

      setCartCount(cart.length);
      setWishlistCount(wishlist.length);
    };

    // Initial load
    updateCounts();

    // Watch for changes in localStorage or custom update events
    window.addEventListener("storage", updateCounts);
    window.addEventListener("cartUpdated", updateCounts);
    window.addEventListener("wishlistUpdated", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("cartUpdated", updateCounts);
      window.removeEventListener("wishlistUpdated", updateCounts);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out ✅");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* 🛍️ Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition"
        >
          🛍️ MyStore
        </Link>

        {/* 🔗 Navigation Links */}
        <div className="flex items-center gap-6 text-lg font-medium">
          <Link to="/" className="hover:text-blue-600 transition">
            Home
          </Link>

          <Link to="/products" className="hover:text-blue-600 transition">
            Products
          </Link>

          {/* 💖 Wishlist link with count */}
          <Link
            to="/wishlist"
            className="hover:text-blue-600 transition relative flex items-center"
          >
            Wishlist
            {wishlistCount > 0 && (
              <span className="ml-1 bg-pink-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* 🛒 Cart link with count */}
          <Link
            to="/cart"
            className="hover:text-blue-600 transition relative flex items-center"
          >
            Cart
            {cartCount > 0 && (
              <span className="ml-1 bg-blue-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                {cartCount}
              </span>
            )}
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/profile" className="hover:text-blue-600 transition">
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-600 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
