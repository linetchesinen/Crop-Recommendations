import React, { useState } from "react";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";

// Mock logout function (replace with your real auth later)
const logoutUser = () => {
  console.log("User logged out");
};

// Comprehensive crop list
const cropOptions = [
  { value: "maize", label: "Maize" },
  { value: "wheat", label: "Wheat" },
  { value: "rice", label: "Rice" },
  { value: "barley", label: "Barley" },
  { value: "oats", label: "Oats" },
  { value: "sorghum", label: "Sorghum" },
  { value: "millet", label: "Millet" },
  { value: "soybean", label: "Soybean" },
  { value: "beans", label: "Beans" },
  { value: "peas", label: "Peas" },
  { value: "chickpea", label: "Chickpea" },
  { value: "lentils", label: "Lentils" },
  { value: "sunflower", label: "Sunflower" },
  { value: "cotton", label: "Cotton" },
  { value: "sugarcane", label: "Sugarcane" },
  { value: "potato", label: "Potato" },
  { value: "tomato", label: "Tomato" },
  { value: "onion", label: "Onion" },
  { value: "cabbage", label: "Cabbage" },
  { value: "cauliflower", label: "Cauliflower" },
  { value: "carrot", label: "Carrot" },
  { value: "lettuce", label: "Lettuce" },
  { value: "spinach", label: "Spinach" },
  { value: "pepper", label: "Pepper" },
  { value: "cucumber", label: "Cucumber" },
  { value: "pumpkin", label: "Pumpkin" },
  { value: "watermelon", label: "Watermelon" },
  { value: "groundnut", label: "Groundnut" },
  { value: "mustard", label: "Mustard" },
  { value: "tea", label: "Tea" },
  { value: "coffee", label: "Coffee" },
  { value: "cocoa", label: "Cocoa" },
  { value: "rubber", label: "Rubber" },
  { value: "tobacco", label: "Tobacco" },
  { value: "jute", label: "Jute" },
  { value: "mango", label: "Mango" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "apple", label: "Apple" },
  { value: "grape", label: "Grape" },
  { value: "strawberry", label: "Strawberry" },
  { value: "pineapple", label: "Pineapple" },
  { value: "coconut", label: "Coconut" },
  { value: "cashew", label: "Cashew" },
  { value: "almond", label: "Almond" }
];

// Comprehensive soil type list
const soilOptions = [
  { value: "alluvial", label: "Alluvial" },
  { value: "black", label: "Black" },
  { value: "red", label: "Red" },
  { value: "clay", label: "Clay" },
  { value: "sandy", label: "Sandy" },
  { value: "loamy", label: "Loamy" },
  { value: "peaty", label: "Peaty" },
  { value: "saline", label: "Saline" },
  { value: "silty", label: "Silty" },
  { value: "chalky", label: "Chalky" },
  { value: "laterite", label: "Laterite" },
  { value: "mountain", label: "Mountain" },
  { value: "desert", label: "Desert" },
  { value: "marshy", label: "Marshy" },
  { value: "forest", label: "Forest" },
  { value: "volcanic", label: "Volcanic" }
];

// Wrapper component to provide router context
function YieldWithRouter() {
  return (
    <Router>
      <Yield />
    </Router>
  );
}

function YieldPrediction() {
  // In a real app, you'd get navigate from useNavigate inside Router context
  const navigate = useNavigate();

  // Form state
  const [cropType, setCropType] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [soilType, setSoilType] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [soilPh, setSoilPh] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  const handlePredict = (e) => {
    e.preventDefault();
    // Here you would send the data to your backend API
    console.log({
      cropType,
      farmArea,
      soilType,
      rainfall,
      temperature,
      humidity,
      soilPh,
      nitrogen,
      phosphorus,
      potassium,
    });
    alert("Prediction submitted! Check console for data.");
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-[url('/public/images/7.jpg')] bg-cover bg-center bg-no-repeat h-screen">
      {/* Top Navigation Bar */}
      <nav className="bg-teal-700 shadow-sm border-b border-gray-200 px-6 py-3 flex flex-wrap items-center justify-between text-white">
        <Link to="/" className="text-2xl font-bold text-white">
          AgriTechKen
        </Link>

        <div className="flex gap-6 hover:bg-teal-800 px-4 py-1 rounded-lg transition">
          <Link to="/" className="hover:text-orange-300">HOME</Link>
          <Link to="/upload" className="hover:text-orange-300">UPLOAD</Link>
          <Link to="/preview" className="hover:text-orange-300">PREVIEW</Link>
          <Link to="/yieldprediction" className="hover:text-orange-300">YIELD PREDICTION</Link>
          <Link to="/croprecommendation" className="hover:text-orange-300">CROP RECOMMENDATION</Link>
          <Link to="/weatherforecast" className="hover:text-orange-300">WEATHER FORECAST</Link>
          <Link to="/weatherreport" className="hover:text-orange-300">WEATHER REPORT</Link>
          <Link to="/charts" className="hover:text-orange-300">CHART</Link>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
          >
            LOGOUT
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="bg-green-50 rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Yield Prediction</h1>
          <p className="text-gray-600 mb-8">
            Enter your farm parameters to predict crop yield using AI
          </p>

          <form onSubmit={handlePredict} className="space-y-6">
            {/* Two‑column grid for inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-4">
                {/* Crop Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Crop Type
                  </label>
                  <select
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select crop</option>
                    {cropOptions.map(crop => (
                      <option key={crop.value} value={crop.value}>
                        {crop.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Farm Area */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Farm Area (hectares)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={farmArea}
                    onChange={(e) => setFarmArea(e.target.value)}
                    placeholder="e.g., 5.5"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                {/* Soil Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Soil Type
                  </label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select soil type</option>
                    {soilOptions.map(soil => (
                      <option key={soil.value} value={soil.value}>
                        {soil.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Annual Rainfall */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Annual Rainfall (mm)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={rainfall}
                    onChange={(e) => setRainfall(e.target.value)}
                    placeholder="e.g., 1200"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                {/* Avg Temperature */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Avg Temperature (°C)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    placeholder="e.g., 28.5"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                {/* Humidity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Humidity (%)
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    max="100"
                    value={humidity}
                    onChange={(e) => setHumidity(e.target.value)}
                    placeholder="e.g., 65"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                {/* Soil pH */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Soil pH
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="14"
                    value={soilPh}
                    onChange={(e) => setSoilPh(e.target.value)}
                    placeholder="e.g., 6.5"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                {/* Nitrogen */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nitrogen (kg/ha)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={nitrogen}
                    onChange={(e) => setNitrogen(e.target.value)}
                    placeholder="e.g., 80"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                {/* Phosphorus */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phosphorus (kg/ha)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={phosphorus}
                    onChange={(e) => setPhosphorus(e.target.value)}
                    placeholder="e.g., 40"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>

                {/* Potassium */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Potassium (kg/ha)
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={potassium}
                    onChange={(e) => setPotassium(e.target.value)}
                    placeholder="e.g., 60"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Predict Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-900 text-white font-semibold py-3 px-8 rounded-md text-lg transition focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Predict Yield
              </button>
            </div>
          </form>
        </div>
      </main>
      
    </div>
  
  );
}

export default YieldPrediction;