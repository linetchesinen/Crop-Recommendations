import express from "express";
import { getCurrentWeather, getForecast } from "../controllers/weatherController.js";

const router = express.Router();

// Current weather (geolocation)
router.get("/current", getCurrentWeather);

// 5-day forecast (city)
router.get("/forecast", getForecast);

export default router;