import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  if (cart.length === 0) {
    return <h1 className="text-2xl font-bold">Your Cart is Empty 🛒</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {/* ✅ Cart Summary */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-4">
            <div>
              <p className="text-lg font-semibold">{item.name}</p>
              <p className="text-gray-600">Qty: {item.qty}</p>
            </div>
            <p className="text-lg font-bold">₹{item.price * item.qty}</p>
          </div>
        ))}

        <hr className="my-4" />

        <p className="text-xl">
          <span className="font-semibold">Total Items:</span> {totalItems}
        </p>

        <p className="text-xl mt-2">
          <span className="font-semibold">Total Price:</span>{" "}
          ₹{totalPrice.toLocaleString()}
        </p>

        <button className="mt-6 bg-green-600 text-white w-full py-3 rounded-lg text-lg hover:bg-green-700">
          Place Order ✅
        </button>
      </div>
    </div>
  );
}
