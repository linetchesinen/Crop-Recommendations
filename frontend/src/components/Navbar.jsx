// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser, logoutUser } from "../utils/auth";

export default function Navbar() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setUser(null);
    nav("/"); // redirect to landing page
  };

  return (
    <nav className="bg-teal-900  text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">AgriTech Kenya</h1>

      <div className="flex gap-6 items-center">
        {user ? (
          <>
            {/* Links visible only when logged in */}
            <span className="text-white">👨‍🌾 {user.user_metadata?.username || user.email}</span>
            <Link to="/dashboard" className="hover:text-orange-300 transition">Home</Link>
            <Link to="/contact" className="hover:text-orange-300 transition">Contact Us</Link>
            <Link to="/preview" className="hover:text-orange-300 transition">Preview</Link>
            <Link to="/yieldPrediction" className="hover:text-orange-300 transition">Yield Prediction</Link>
            <Link to="/cropRecommendation" className="hover:text-orange-300 transition">Crop Recommendation</Link>
            <Link to="/weatherForecast" className="hover:text-orange-300 transition">Weather Forecast</Link>
            

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded-md transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Only Home & Login when not logged in */}
            <Link to="/" className="hover:text-orange-300 transition">Home</Link>
            <Link to="/login" className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded-md transition">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}