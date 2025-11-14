import { useState } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // ✅ Correct API URL (now aligned with backend)
      const res = await API.post("/users/login", { email, password });

      // ✅ Show success toast
      toast.success("Login Successful ✅");

      // ✅ Save user + token
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token);

      // ✅ Redirect to home
      navigate("/");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      toast.error(err.response?.data?.message || "Login failed ❌");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
      <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Welcome Back 👋
        </h1>

        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-500 text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
