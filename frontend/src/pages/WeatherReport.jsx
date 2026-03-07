import React, { useState } from "react";
import { Link } from "react-router-dom";

// Mock historical report generator based on forecast data
const generateReport = (location, period) => {
  // Simulate data for the selected period
  const periods = {
    "Last Week": 7,
    "Last Month": 30,
    "Last 3 Months": 90,
  };
  const days = periods[period] || 7;
  const avgTemp = (20 + Math.random() * 8).toFixed(1);
  const totalRain = (Math.random() * 100).toFixed(1);
  const avgHumidity = (50 + Math.random() * 30).toFixed(0);
  const dominantCondition = ["Sunny", "Cloudy", "Rainy", "Mixed"][Math.floor(Math.random() * 4)];

  return {
    location,
    period,
    summary: `Over the ${period.toLowerCase()}, ${location} experienced ${dominantCondition.toLowerCase()} conditions with an average temperature of ${avgTemp}°C.`,
    details: {
      avgTemp,
      totalRain,
      avgHumidity,
      dominantCondition,
    },
    daily: Array.from({ length: Math.min(days, 7) }, (_, i) => ({
      day: `Day ${i + 1}`,
      temp: (18 + Math.random() * 10).toFixed(1),
      condition: ["Sunny", "Partly Cloudy", "Rain"][Math.floor(Math.random() * 3)],
    })),
  };
};

export default function WeatherReport() {
  const [location, setLocation] = useState("");
  const [period, setPeriod] = useState("Last Week");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = (e) => {
    e.preventDefault();
    if (!location.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const data = generateReport(location, period);
      setReport(data);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-teal-700 text-white px-6 py-3 flex flex-wrap items-center justify-between">
        <Link to="/" className="text-2xl font-bold">AgriTech Kenya</Link>
        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:text-orange-300">HOME</Link>
          <Link to="/upload" className="hover:text-orange-300">UPLOAD</Link>
          <Link to="/preview" className="hover:text-orange-300">PREVIEW</Link>
          <Link to="/yieldprediction" className="hover:text-orange-300">YIELD PREDICTION</Link>
          <Link to="/croprecommendation" className="hover:text-orange-300">CROP RECOMMENDATION</Link>
          <Link to="/weatherforecast" className="hover:text-orange-300">WEATHER FORECAST</Link>
          <Link to="/weatherreport" className="hover:text-orange-300 font-semibold">WEATHER REPORT</Link>
          <Link to="/charts" className="hover:text-orange-300">CHART</Link>
          <Link to="/" className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md">LOGOUT</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Weather Report</h1>
          <p className="text-gray-600 mb-6">Detailed weather reports and historical data for your region</p>

          <form onSubmit={handleGenerateReport} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter location (e.g., Kisumu)"
                className="col-span-1 md:col-span-2 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                required
              />
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              >
                <option>Last Week</option>
                <option>Last Month</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-2 rounded-md disabled:bg-green-300"
              >
                {loading ? "Generating..." : "Generate Report"}
              </button>
            </div>
          </form>

          {report && (
            <div className="border-t pt-6">
              <h2 className="text-2xl font-semibold mb-2">Weather Report for {report.location}</h2>
              <p className="text-gray-700 mb-4">{report.summary}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600">Avg Temperature</div>
                  <div className="text-2xl font-bold">{report.details.avgTemp}°C</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600">Total Rainfall</div>
                  <div className="text-2xl font-bold">{report.details.totalRain} mm</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600">Avg Humidity</div>
                  <div className="text-2xl font-bold">{report.details.avgHumidity}%</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-sm text-gray-600">Dominant</div>
                  <div className="text-2xl font-bold">{report.details.dominantCondition}</div>
                </div>
              </div>

              <h3 className="font-semibold mb-2">Daily Breakdown (Sample)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Day</th>
                      <th className="px-4 py-2 text-left">Temperature (°C)</th>
                      <th className="px-4 py-2 text-left">Condition</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.daily.map((day, idx) => (
                      <tr key={idx} className="border-t">
                        <td className="px-4 py-2">{day.day}</td>
                        <td className="px-4 py-2">{day.temp}</td>
                        <td className="px-4 py-2">{day.condition}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-400 text-right mt-4">
          Historical data simulated based on Kenyan weather patterns
        </div>
      </main>
    </div>
  );
}