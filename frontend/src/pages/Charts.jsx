import React from "react";
import { Link } from "react-router-dom";

export default function Charts() {
  return (
    <div className="min-h-screen bg-green-50 bg-[url('/public/images/3.jpg')] bg-cover bg-center bg-no-repeat h-screen">
      
      {/* NAVBAR */}
      <nav className="bg-teal-700 text-white px-6 py-6 flex justify-between">
        <h1 className="font-bold text-xl">AgriTech Kenya</h1>

        <div className="flex gap-6 hover:bg-teal-800 px-4 py-1 rounded-lg transition">
          <Link to="/dashboard" className="hover:text-orange-300">Home</Link>
          <Link to="/upload" className="hover:text-orange-300">Upload</Link>
          <Link to="/preview" className="hover:text-orange-300">Preview</Link>
          <Link to="/yieldPrediction" className="hover:text-orange-300">Yield Prediction</Link>
          <Link to="/cropRecommendation" className="hover:text-orange-300">Crop Recommendation</Link>
          <Link to="/weatherForecast" className="hover:text-orange-300">Weather Forecast</Link>
          <Link to="/weatherReport" className="hover:text-orange-300">Weather Report</Link>
          <Link to="/charts" className="hover:text-orange-300">Charts</Link>
          <Link to="/login" className="bg-red-700 hover:bg-red-800 text-white px-4 py-1 rounded-md transition">
            Logout
          </Link>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Charts</h2>
        <p>This page will show charts and visualizations of your farm data.</p>
      </div>

    </div>
  );
}
