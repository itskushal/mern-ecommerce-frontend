import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);

  // ✅ Load all products from backend
  const loadProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/API/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Failed to load products:", error);
    }
  };

  // ✅ Load products on page load
  useEffect(() => {
    loadProducts();
  }, []);

  // ✅ Delete product (Admin only)
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5000/API/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product deleted ✅");
      loadProducts(); // refresh product list
    } catch (error) {
      alert("Failed to delete product ❌");
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Products</h1>

      {/* ✅ Add Product Button */}
      <Link
        to="/admin/add-product"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Product
      </Link>

      {/* ✅ Product List */}
      <div className="mt-6 space-y-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{p.name}</h2>
              <p>₹{p.price}</p>
            </div>

            <div className="flex gap-4">

              {/* ✅ Edit Product */}
              <Link
                to={`/admin/edit-product/${p._id}`}
                className="text-green-600 font-semibold"
              >
                Edit
              </Link>

              {/* ✅ Delete Product */}
              <button
                onClick={() => handleDelete(p._id)}
                className="text-red-600 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
