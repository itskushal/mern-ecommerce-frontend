import { useState } from "react";
import api from "../../api/axiosInstance";
import { toast } from "react-toastify";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(""); // image URL returned by server
  const [uploading, setUploading] = useState(false);
  const [creating, setCreating] = useState(false);

  // ============================================
  // 1️⃣ Handle image upload
  // ============================================
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const { data } = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Returned:  { imageUrl: "/uploads/xxxx.jpg" }
      setImage(data.imageUrl);

      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error("Upload Error:", err);
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // ============================================
  // 2️⃣ Handle product creation
  // ============================================
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!name || !price) {
      toast.error("Name and price are required");
      return;
    }

    try {
      setCreating(true);

      await api.post("/products", {
        name,
        description,
        price: Number(price),
        category,
        image, // stored /uploads/... path
      });

      toast.success("Product created successfully!");

      // Reset fields
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setImage("");

    } catch (err) {
      console.error("Create Product Error:", err);
      toast.error(err.response?.data?.message || "Failed to create product");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        ➕ Add New Product
      </h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full p-3 bg-gray-100 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 bg-gray-100 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full p-3 bg-gray-100 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          className="w-full p-3 bg-gray-100 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* IMAGE UPLOAD */}
        <div>
          <label className="block font-semibold mb-1">Product Image</label>
          <input type="file" accept="image/*" onChange={uploadFileHandler} />

          {uploading && <p className="text-gray-500 mt-2">Uploading...</p>}

          {image && (
            <div className="mt-3">
              <p className="text-sm text-gray-600">Preview:</p>

              <img
                src={
                  image.startsWith("http")
                    ? image
                    : `http://localhost:5000${image}`
                }
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={creating}
          className={`w-full py-2 rounded-lg text-white ${
            creating ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {creating ? "Creating..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
