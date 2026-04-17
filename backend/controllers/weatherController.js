import axios from "axios";

// ================= CURRENT WEATHER =================
export const getCurrentWeather = async (req, res) => {
  const API_KEY = process.env.WEATHER_KEY;
  const { lat, lon, city } = req.query;

  if ((!lat || !lon) && !city) {
    return res.status(400).json({ error: "Latitude & longitude or city is required" });
  }

  if (!API_KEY) return res.status(500).json({ error: "API key not configured" });

  try {
    const params = { appid: API_KEY, units: "metric" };
    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    } else {
      params.q = `${city},KE`; // fallback to city
    }

    const response = await axios.get("https://api.openweathermap.org/data/2.5/weather", { params });
    res.json(response.data);

  } catch (error) {
    console.error("Current weather error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch current weather", details: error.response?.data || error.message });
  }
};

// ================= FORECAST =================
export const getForecast = async (req, res) => {
  const API_KEY = process.env.WEATHER_KEY;
  const { lat, lon, city } = req.query;

  if ((!lat || !lon) && !city) {
    return res.status(400).json({ error: "Latitude & longitude or city is required" });
  }

  if (!API_KEY) return res.status(500).json({ error: "API key not configured" });

  try {
    const params = { appid: API_KEY, units: "metric" };
    if (lat && lon) {
      params.lat = lat;
      params.lon = lon;
    } else {
      params.q = `${city},KE`; // fallback to city
    }

    const response = await axios.get("https://api.openweathermap.org/data/2.5/forecast", { params });
    res.json(response.data);

  } catch (error) {
    console.error("Forecast error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch forecast", details: error.response?.data || error.message });
  }
};