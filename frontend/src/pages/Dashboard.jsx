import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { logoutUser } from "../utils/auth";

export default function Dashboard() {
  const nav = useNavigate();

  const logout = () => {
    logoutUser();
    nav("/login");
  };

  // Dashboard features with their paths and icons
  const features = [
    { name: "Upload Dataset", path: "/upload", icon: "📤" },
    { name: "Preview Data", path: "/preview", icon: "👁️" },
    { name: "Yield Prediction", path: "/yieldprediction", icon: "📊" },
    { name: "Crop Recommendation", path: "/croprecommendation", icon: "🌾" },
    { name: "Weather Forecast", path: "/weatherforecast", icon: "⛅" },
    { name: "Weather Report", path: "/weatherreport", icon: "🌡️" },
    { name: "Charts", path: "/charts", icon: "📈" },
  ];

  return (
    <div className="flex min-h-screen bg-green-50 w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Navbar */}
        <nav className="bg-teal-700 text-bold px-6 py-4 flex flex-col sm:flex-row justify-between items-center w-full gap-4 sm:gap-0">
          <h1 className="font-bold text-xl">AgriTech Kenya</h1>
          <div className="flex flex-wrap gap-3 sm:gap-6 bg-teal-500 p-3 rounded-lg hover:bg-teal-600 transition justify-center ">
            <Link to="/dashboard" className="hover:text-orange-300">
              Home
            </Link>
            <Link to="/upload" className="hover:text-orange-300">
              Upload
            </Link>
            <Link to="/preview" className="hover:text-orange-300">
              Preview
            </Link>
            <Link to="/yieldPrediction" className="hover:text-orange-300">
              Yield Prediction
            </Link>
            <Link to="/cropRecommendation" className="hover:text-orange-300">
              Crop Recommendation
            </Link>
            <Link to="/weatherForecast" className="hover:text-orange-300">
              Weather Forecast
            </Link>
            <Link to="/weatherReport" className="hover:text-orange-300">
              Weather Report
            </Link>
            <Link to="/charts" className="hover:text-orange-300">
              Charts
            </Link>
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-md transition"
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center w-full min-h-7 bg-gradient-to-r from-green-500 via-red-500 to-blue-500 text-center p-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Welcome to AgriTech System
          </h2>
          <p className="text-xl sm:text-2xl text-white mb-8 max-w-3xl">
            Empowering Kenyan farmers with smart agricultural solutions
          </p>
        </div>

        {/* Features / Dashboard Cards */}
        <div className="w-full max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 justify-center">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer text-center flex flex-col items-center"
              >
                <div className="text-4xl mb-3">{f.icon}</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-4">{f.name}</h4>

                {/* Access Button */}
                <Link to={f.path} className="w-full">
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
