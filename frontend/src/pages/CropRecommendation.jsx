import React, { useState } from "react";
import axios from "axios";

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    temperature: "",
    rainfall: "",
    soilPh: "",
    nitrogen: "",
    phosphorus: "",
    potassium: ""
  });
  const [recommendation, setRecommendation] = useState("");
  const [topRecs, setTopRecs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const placeholders = {
    temperature: "e.g. 25",
    rainfall: "e.g. 200",
    soilPh: "e.g. 6.5",
    nitrogen: "e.g. 90",
    phosphorus: "e.g. 40",
    potassium: "e.g. 40"
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(""); setRecommendation(""); setTopRecs([]);

    const requiredFields = ["temperature", "rainfall", "soilPh", "nitrogen", "phosphorus", "potassium"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setError(`Please fill in ${field}`); setLoading(false); return;
      }
    }

    try {
      const payload = {};
      requiredFields.forEach(f => payload[f] = parseFloat(formData[f]));

      const response = await axios.post("http://localhost:3000/api/crops/recommend", payload);

      setRecommendation(response.data.recommendation);
      setTopRecs(response.data.recommendations || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Failed to get recommendation. Check backend.");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 max-w-3xl w-full px-4 py-8 mx-auto">
        <section className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Crop Recommendation</h2>
          <p className="text-gray-600 mb-6 text-center">Get crop recommendations based on your farm conditions</p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.keys(formData).map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type="number"
                    step={field === "soilPh" ? "0.1" : "1"}
                    id={field}
                    placeholder={placeholders[field]}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <button type="submit" className="bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-8 rounded-md">
                {loading ? "Getting Recommendation..." : "Get Recommendation"}
              </button>
            </div>
          </form>

          {recommendation && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md text-green-800">
              <strong>Recommended Crop:</strong> {recommendation}
              {topRecs.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold">Top Recommendations:</h3>
                  {topRecs.map((rec, i) => (
                    <div key={i} className="flex justify-between">
                      <span>{rec.crop}</span>
                      <span>{rec.confidence}%</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {error && <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-800">{error}</div>}
        </section>
      </main>
    </div>
  );
}