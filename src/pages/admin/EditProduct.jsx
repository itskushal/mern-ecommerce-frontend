import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    const res = await axios.get(`http://localhost:5000/api/products/${id}`);
    setProduct(res.data);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/products/${id}`, product);
    alert("Updated!");
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

      <form className="space-y-4" onSubmit={handleUpdate}>
        <input className="border p-2 w-full" name="name" value={product.name} onChange={handleChange} />
        <input className="border p-2 w-full" name="price" value={product.price} onChange={handleChange} />
        <input className="border p-2 w-full" name="image" value={product.image} onChange={handleChange} />
        <input className="border p-2 w-full" name="category" value={product.category} onChange={handleChange} />
        <textarea className="border p-2 w-full" name="description" value={product.description} onChange={handleChange} />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
