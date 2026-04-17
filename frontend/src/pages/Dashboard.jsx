// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, getUser } from "../utils/auth";

export default function Dashboard() {
  const nav = useNavigate();
  const [user, setUser] = useState(null);

  // Load user on component mount
  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      nav("/login"); // redirect if not logged in
    } else {
      setUser(currentUser);
    }
  }, [nav]);

  const handleLogout = async () => {
    await logoutUser();
    nav("/"); // redirect to landing page
  };

  const features = [
    { name: "Contact Us", path: "/contact", icon: "📞" },
    { name: "Preview Data", path: "/preview", icon: "👁️" },
    { name: "Yield Prediction", path: "/yieldprediction", icon: "📊" },
    { name: "Crop Recommendation", path: "/croprecommendation", icon: "🌾" },
    { name: "Weather Forecast", path: "/weatherforecast", icon: "⛅" },
    { name: "Weather Report", path: "/weatherreport", icon: "🌡️" },
   
  ];

  return (
    <div className="flex min-h-screen bg-green-50 w-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Navbar */}
        <div className="flex justify-between items-center bg-white shadow px-8 py-4">
          <h1 className="text-xl font-bold text-green-700">Farmer Dashboard</h1>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-gray-600">
                👨‍🌾 {user.user_metadata?.username || user.email}
              </span>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center w-full bg-gradient-to-r from-green-500 via-red-500 to-blue-500 text-center p-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Welcome to AgriTech System
          </h2>
          <p className="text-xl sm:text-2xl text-white mb-4 max-w-3xl">
            Empowering Kenyan farmers with smart agricultural solutions
          </p>
          {user && (
            <p className="text-white text-lg">
              Welcome <strong>{user.user_metadata?.username || user.email}</strong>
            </p>
          )}
        </div>

        {/* Features */}
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition text-center"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">{f.name}</h4>
                <Link to={f.path}>
                  <button className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition w-full">
                    Access {f.name}
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}