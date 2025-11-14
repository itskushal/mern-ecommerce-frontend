import { useEffect, useState } from "react";
import API from "../api/axiosInstance";
import { toast } from "react-toastify";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile"); // ✅ Correct endpoint
        setUser(res.data);
      } catch (error) {
        console.error("Profile fetch error:", error);
        toast.error("Failed to load profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading Profile...</p>;

  if (!user)
    return (
      <p className="text-center text-red-500">
        No profile data found. Please log in again.
      </p>
    );

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-8 mt-10">
      <h2 className="text-2xl font-bold text-center mb-4 text-blue-600">
        👤 User Profile
      </h2>
      <div className="space-y-3">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
