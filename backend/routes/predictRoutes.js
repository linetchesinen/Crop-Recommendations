// routes/predictRoutes.js
import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/predict", async (req, res) => {
  try {
    const { crop, rainfall, temperature, humidity, ph, nitrogen, phosphorus, potassium } = req.body;

    const payload = { crop, rainfall, temperature, humidity, ph, nitrogen, phosphorus, potassium };

    console.log("Forwarding to model:", payload);

    const response = await axios.post("http://localhost:5000/predict", payload);

    res.json(response.data);

  } catch (err) {
    console.error("Prediction error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data?.error || "Failed to get prediction from model" });
  }
});

export default router;