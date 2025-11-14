import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  // ✅ Find product from the data
  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return <h1 className="text-xl font-bold">Product Not Found</h1>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col md:flex-row gap-8">

        {/* ✅ Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-cover rounded-xl"
        />

        {/* ✅ Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl text-blue-600 mt-2">₹{product.price}</p>
            <p className="text-gray-600 mt-4">
              This is a demo description. Later we will load real descriptions
              from MongoDB.
            </p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
