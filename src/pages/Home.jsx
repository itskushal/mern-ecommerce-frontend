import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentSlide, setCurrentSlide] = useState(0);

  // ✅ Carousel Images
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1920&q=80",
      title: "Upgrade Your Lifestyle",
      subtitle: "Discover premium gadgets and accessories",
    },
    {
      image:
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1920&q=80",
      title: "Shop the Latest Trends",
      subtitle: "Find your perfect style and tech essentials",
    },
    {
      image:
        "https://images.unsplash.com/photo-1512499617640-c2f999098c5c?auto=format&fit=crop&w=1920&q=80",
      title: "Exclusive Deals Just for You",
      subtitle: "Don’t miss out on limited-time offers",
    },
  ];

  // ✅ Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // ✅ Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get("/products");
        setProducts(res.data);
        setFilteredProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Filter logic
  useEffect(() => {
    let updated = [...products];
    if (selectedCategory !== "All") {
      updated = updated.filter(
        (p) =>
          p.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    if (searchTerm) {
      updated = updated.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredProducts(updated);
  }, [searchTerm, selectedCategory, products]);

  const categories = ["All", "Shoes", "Mobiles", "Accessories", "Electronics"];

  // ✅ Sort logic
  const trendingProducts = [...products].slice(0, 4); // manually top 4 (can add logic for most viewed later)
  const newArrivals = [...products]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ✅ Search Bar */}
      <div className="sticky top-0 bg-white z-20 shadow-sm py-4">
        <div className="max-w-4xl mx-auto flex justify-center px-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="🔍 Search for products..."
            className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
        </div>
      </div>

      {/* ✅ Category Filter */}
      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3 mt-6 mb-8 px-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full border transition-all ${
              selectedCategory === cat
                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ✅ Hero Carousel */}
      <section className="relative h-[450px] overflow-hidden rounded-xl mx-4 shadow-lg">
        <AnimatePresence>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center text-white px-6">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl mb-6">
                {slides[currentSlide].subtitle}
              </p>
              <a
                href="/products"
                className="px-8 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Shop Now
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ✅ Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === idx ? "bg-white" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ✅ Featured Products */}
      <section className="max-w-6xl mx-auto px-4 mt-12 pb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Featured Products
        </h2>
        {filteredProducts.length === 0 ? (
          <p className="text-gray-500 text-lg">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 🌟 Trending Products */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">🔥 Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🆕 New Arrivals */}
      <section className="max-w-6xl mx-auto px-4 mt-12 mb-20">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          🆕 New Arrivals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
