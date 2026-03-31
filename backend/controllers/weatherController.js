import axios from "axios";

// ✅ Load API key from environment
const API_KEY = process.env.WEATHER_KEY;
console.log("Loaded WEATHER_KEY:", API_KEY);

// ================= CURRENT WEATHER =================
export const getCurrentWeather = async (req, res) => {
  const { lat, lon } = req.query;

  // Validate inputs
  if (!lat || !lon) {
    return res.status(400).json({ error: "Latitude and longitude required" });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          lat,
          lon,
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error("FULL ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to fetch current weather",
      details: error.response?.data || error.message
    });
  }
}; // ✅ FIX: properly close function here


// ================= FORECAST =================
export const getForecast = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  try {
    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: `${city},KE`, // restrict search to Kenya
          appid: API_KEY,
          units: "metric",
        },
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error("Forecast error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to fetch forecast",
      details: error.response?.data || error.message
    });
  }
};