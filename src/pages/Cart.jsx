import { useEffect, useState } from "react";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import API from "../api/axiosInstance";
import { toast } from "react-toastify";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartWithQty = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(cartWithQty);
  }, []);

  // ✅ Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Increase quantity
  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
    toast.info("➕ Quantity increased");
  };

  // ✅ Decrease quantity
  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
    toast.info("➖ Quantity decreased");
  };

  // ✅ Remove item
  const handleRemoveItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    toast.warn("🗑️ Item removed from cart");
  };

  // ✅ Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Clear cart
  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
    toast.error("🧹 Cart cleared");
  };

  // ✅ Checkout → Create order in backend
  const handleCheckout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        toast.warn("⚠️ Please log in to proceed to checkout.");
        setLoading(false);
        return;
      }

      const orderItems = cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      }));

      const res = await API.post(
        "/API/orders",
        {
          orderItems,
          totalAmount: total,
          paymentMethod: "COD",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("✅ Order placed successfully!");
        handleClearCart();
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("❌ Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12 bg-white shadow-lg rounded-xl p-8">
      <div className="flex items-center justify-center mb-8">
        <ShoppingCart className="text-blue-700 w-8 h-8 mr-2" />
        <h1 className="text-3xl font-bold text-blue-700">My Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your cart is empty 😔
        </p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-4 mb-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    ₹{item.price.toLocaleString()}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="bg-gray-200 px-2 rounded-md hover:bg-gray-300"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="mx-3 font-semibold text-gray-700">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item._id)}
                      className="bg-gray-200 px-2 rounded-md hover:bg-gray-300"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <p className="font-semibold text-blue-700">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* Total + Buttons */}
          <div className="mt-8 border-t pt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              Total: ₹{total.toLocaleString()}
            </h2>
            <div className="space-x-4">
              <button
                onClick={handleClearCart}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
              >
                Clear Cart
              </button>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className={`px-6 py-2 rounded-lg font-semibold text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Processing..." : "Checkout"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
