import React from "react";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

export default function CropRecommendation() {
  return (
    <div>
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
          <Link to="/" className="bg-red-700 hover:bg-red-800 text-white px-4 py-1 rounded-md transition">Logout</Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8">
        <hr className="mb-8 border-gray-300" />

        <section className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Crop Recommendation</h2>
          <p className="text-gray-600 mb-6">Get personalized crop recommendations based on your farm conditions</p>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" id="state" placeholder="e.g., Punjab"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"/>
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">District</label>
                <input type="text" id="district" placeholder="e.g., Ludhiana"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"/>
              </div>

              <div>
                <label htmlFor="season" className="block text-sm font-medium text-gray-700 mb-1">Season</label>
                <select id="season"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white">
                  <option value="">Select season</option>
                  <option>Spring</option>
                  <option>Summer</option>
                  <option>Fall</option>
                </select>
              </div>

              <div>
                <label htmlFor="soilType" className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                <select id="soilType"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 bg-white">
                  <option value="">Select soil type</option>
                  <option>Alluvial</option>
                  <option>Black</option>
                  <option>Red</option>
                  <option>Clay</option>
                  <option>Sandy</option>
                  <option>Loamy</option>
                  <option>Peaty</option>
                  <option>Saline</option>
                  <option>Silty</option>
                  <option>Chalky</option>
                  <option>Laterite</option>
                  <option>Mountain</option>
                  <option>Desert</option>
                  <option>Marshy</option>
                  <option>Forest</option>
                  <option>Volcanic</option>
                </select>
              </div>

              <div>
                <label htmlFor="rainfall" className="block text-sm font-medium text-gray-700 mb-1">Expected Rainfall (mm)</label>
                <input type="number" id="rainfall" placeholder="e.g., 800"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"/>
              </div>

              <div>
                <label htmlFor="temperature" className="block text-sm font-medium text-gray-700 mb-1">Avg Temperature (°C)</label>
                <input type="number" id="temperature" placeholder="e.g., 25"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"/>
              </div>

              <div>
                <label htmlFor="humidity" className="block text-sm font-medium text-gray-700 mb-1">Humidity (%)</label>
                <input type="number" id="humidity" placeholder="e.g., 70"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"/>
              </div>

              <div>
                <label htmlFor="ph" className="block text-sm font-medium text-gray-700 mb-1">Soil pH</label>
                <input type="number" step="0.1" id="ph" placeholder="e.g., 7.0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"/>
              </div>

              <div>
                <label htmlFor="nitrogen" className="block text-sm font-medium text-gray-700 mb-1">Nitrogen (kg/ha)</label>
                <input type="number" id="nitrogen" placeholder="e.g., 90"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"/>
              </div>

              <div>
                <label htmlFor="phosphorus" className="block text-sm font-medium text-gray-700 mb-1">Phosphorus (kg/ha)</label>
                <input type="number" id="phosphorus" placeholder="e.g., 45"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"/>
              </div>

              <div>
                <label htmlFor="potassium" className="block text-sm font-medium text-gray-700 mb-1">Potassium (kg/ha)</label>
                <input type="number" id="potassium" placeholder="e.g., 50"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"/>
              </div>

            </div>

            <div className="flex justify-center pt-4">
              <button type="submit"
                className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-8 rounded-md transition-colors">
                Get Recommendation
              </button>
            </div>
          </form>
        </section>

        <div className="text-xs text-gray-400 text-right mt-4">
          dddb-v2-figmaiframepreview.figma.site/crop-recommendation · 1:18 PM
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-600">
        © 2026 AgriTech System. Empowering farmers with technology.
      </footer>

    </div>
  );
}