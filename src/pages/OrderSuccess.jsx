import { Link } from "react-router-dom";

export default function OrderSuccess() {
  const orderId = Math.floor(100000 + Math.random() * 900000); // fake order ID

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white p-8 rounded-xl shadow-md text-center">
      <h1 className="text-3xl font-bold text-green-600">
        ✅ Order Placed Successfully!
      </h1>

      <p className="text-lg text-gray-700 mt-4">
        Thank you for your purchase. Your order ID is:
      </p>

      <p className="text-2xl font-bold mt-2 text-gray-900">#{orderId}</p>

      <div className="mt-6 flex justify-center gap-4">
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Go to Home
        </Link>

        <Link
          to="/products"
          className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

