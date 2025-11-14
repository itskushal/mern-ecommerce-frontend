import { useState } from "react";
import API from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      // ✅ Correct API endpoint
      const res = await API.post("/users/register", { name, email, password });

      // ✅ Save token (optional, if you want to auto-login)
      localStorage.setItem("token", res.data.token);

      toast.success("✅ Registration Successful!");
      navigate("/login");
    } catch (error) {
      console.error("REGISTER ERROR:", error);
      toast.error(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Create an Account
      </h2>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-3 bg-gray-100 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-3 bg-gray-100 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-3 bg-gray-100 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-3 hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}
