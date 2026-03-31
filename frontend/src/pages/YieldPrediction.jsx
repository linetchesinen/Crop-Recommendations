import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock logout function
const logoutUser = () => console.log("User logged out");

function YieldPrediction() {
  const navigate = useNavigate();

  const [cropType, setCropType] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [soilPh, setSoilPh] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const logout = () => {
    logoutUser();
    navigate("/");
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction(null);

    try {
      const payload = {
        temperature: Number(temperature),
        rainfall: Number(rainfall),
        soilPh: Number(soilPh),
        nitrogen: Number(nitrogen),
        phosphorus: Number(phosphorus),
        potassium: Number(potassium),
        cropType: cropType.charAt(0).toUpperCase() + cropType.slice(1).toLowerCase()
      };

      const response = await fetch("http://localhost:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server did not return valid JSON");
      }

      if (!response.ok) throw new Error(data.error || "Prediction failed");

      setPrediction(data.predicted);

    } catch (err) {
      setError("Failed to get prediction from model");
      console.error("Prediction error:", err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 bg-[url('/public/images/7.jpg')] bg-cover bg-center">
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-green-50 rounded-lg shadow-md p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Yield Prediction</h1>
          <p className="text-gray-600 mb-8">Enter farm parameters to predict crop yield using AI</p>

          <form onSubmit={handlePredict} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Crop Type</label>
                <input
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  placeholder="e.g. Maize"
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Temperature (°C)</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  placeholder="0–50 °C"
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Rainfall (mm)</label>
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                  placeholder="0–500 mm"
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Soil pH</label>
                <input
                  type="number"
                  step="0.1"
                  min="3"
                  max="9"
                  value={soilPh}
                  onChange={(e) => setSoilPh(e.target.value)}
                  placeholder="3–9"
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Nitrogen (kg/ha)</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(e.target.value)}
                  placeholder="0–200"
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phosphorus (kg/ha)</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(e.target.value)}
                  placeholder="0–200"
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Potassium (kg/ha)</label>
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={potassium}
                  onChange={(e) => setPotassium(e.target.value)}
                  placeholder="0–200"
                  className="w-full border rounded-md px-3 py-2"
                  required
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-md"
              >
                {loading ? "Predicting..." : "Predict Yield"}
              </button>
            </div>
          </form>

          {error && <div className="mt-6 text-red-600 font-semibold text-center">{error}</div>}

          {prediction && (
            <div className="mt-8 bg-green-100 border border-green-400 rounded-lg p-6 text-center">
              <h2 className="text-xl font-bold text-green-800">Predicted Production</h2>
              <p className="text-3xl font-bold text-green-700 mt-2">{prediction} tons</p>
              <p className="text-gray-600 mt-2">Estimated yield for your farm</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default YieldPrediction;