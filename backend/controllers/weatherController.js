import axios from "axios";

export const getWeather = async (req, res) => {
  try {
    const { location } = req.query;
    const apiKey = process.env.WEATHER_API_KEY; // store in .env
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};