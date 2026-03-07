import React, { useState } from "react";
import { Link } from "react-router-dom";

// Mock function to generate 7-day forecast for Kenyan locations
const getMockForecast = (location) => {
  const days = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];
  return days.map((day, index) => ({
    day,
    date: new Date(Date.now() + index * 86400000).toLocaleDateString("en-KE", {
      month: "short", day: "numeric"
    }),
    condition: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Thunderstorms", "Windy", "Clear"][index % 7],
    tempHigh: 24 + Math.floor(Math.random() * 8),
    tempLow: 15 + Math.floor(Math.random() * 5),
    rainfall: Math.floor(Math.random() * 20),
    humidity: 55 + Math.floor(Math.random() * 25),
  }));
};

export default function WeatherForecast() {
  const [location, setLocation] = useState("");
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetForecast = (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const data = getMockForecast(location);
      setForecast(data);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar (same as previous components) */}
      <nav className="bg-teal-700 text-white px-6 py-3 flex flex-wrap items-center justify-between">
        <Link to="/" className="text-2xl font-bold">AgriTech Kenya</Link>
        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:text-orange-300">HOME</Link>
          <Link to="/upload" className="hover:text-orange-300">UPLOAD</Link>
          <Link to="/preview" className="hover:text-orange-300">PREVIEW</Link>
          <Link to="/yieldprediction" className="hover:text-orange-300">YIELD PREDICTION</Link>
          <Link to="/croprecommendation" className="hover:text-orange-300">CROP RECOMMENDATION</Link>
          <Link to="/weatherforecast" className="hover:text-orange-300 font-semibold">WEATHER FORECAST</Link>
          <Link to="/weatherreport" className="hover:text-orange-300">WEATHER REPORT</Link>
          <Link to="/charts" className="hover:text-orange-300">CHART</Link>
          <Link to="/" className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md">LOGOUT</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Weather Forecast</h1>
          <p className="text-gray-600 mb-6">Get 7-day weather forecast for your location</p>

          <form onSubmit={handleGetForecast} className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter city or region name (e.g., Nairobi)"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-md disabled:bg-green-300"
              >
                {loading ? "Fetching..." : "Get Forecast"}
              </button>
            </div>
          </form>

          {forecast && (
            <div>
              <h2 className="text-xl font-semibold mb-4">7-Day Forecast for {location}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {forecast.map((day, idx) => (
                  <div key={idx} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <div className="font-bold">{day.day}</div>
                    <div className="text-sm text-gray-500">{day.date}</div>
                    <div className="mt-2 text-lg">{day.condition}</div>
                    <div className="flex justify-between mt-2">
                      <span>H: {day.tempHigh}°C</span>
                      <span>L: {day.tempLow}°C</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Rain: {day.rainfall} mm</div>
                    <div className="text-sm text-gray-600">Humidity: {day.humidity}%</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer credit (optional) */}
        <div className="text-xs text-gray-400 text-right mt-4">
          Data simulated for Kenyan regions
        </div>
      </main>
    </div>
  );
}