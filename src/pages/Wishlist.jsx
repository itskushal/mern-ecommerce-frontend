import { useEffect, useState } from "react";
import { Trash2, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(stored);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item._id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    toast.info("Removed from wishlist ❤️");
  };

  const moveToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success(`${product.name} moved to cart 🛒`);
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        ❤️ My Wishlist
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No items in your wishlist 😔
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <img
                src={item.image || "https://via.placeholder.com/200"}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-blue-600 font-bold mb-3">₹{item.price}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => moveToCart(item)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <ShoppingCart size={16} /> Move to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center gap-2"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
