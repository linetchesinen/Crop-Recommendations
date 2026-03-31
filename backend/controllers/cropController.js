import axios from "axios";

const ML_API = process.env.ML_API_URL || "http://localhost:5000";

// ================= CROP RECOMMENDATION =================
export const recommendCrop = async (req, res) => {
  const { temperature, rainfall, soilPh, nitrogen, phosphorus, potassium } = req.body;
  const requiredFields = ["temperature", "rainfall", "soilPh", "nitrogen", "phosphorus", "potassium"];

  for (let field of requiredFields) {
    if (req.body[field] === undefined || req.body[field] === "") {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  try {
    const payload = { temperature, rainfall, soilPh, nitrogen, phosphorus, potassium };
    const response = await axios.post(`${ML_API}/predict`, payload);

    return res.json({
      recommendation: response.data.recommendation,
      recommendations: response.data.recommendations || []
    });

  } catch (err) {
    console.error("Crop Recommendation Error:", err.response?.data || err.message);
    return res.status(500).json({
      error: "Crop recommendation failed",
      details: err.response?.data?.error || err.message
    });
  }
};

// ================= YIELD PREDICTION =================
export const predictCropYield = async (req, res) => {
  const { temperature, rainfall, soilPh, nitrogen, phosphorus, potassium, cropType } = req.body;
  const requiredFields = ["temperature", "rainfall", "soilPh", "nitrogen", "phosphorus", "potassium", "cropType"];

  for (let field of requiredFields) {
    if (req.body[field] === undefined || req.body[field] === "") {
      return res.status(400).json({ error: `${field} is required` });
    }
  }

  try {
    const payload = { temperature, rainfall, soilPh, nitrogen, phosphorus, potassium, cropType };
    const response = await axios.post(`${ML_API}/api/predict`, payload);
    return res.json({ predicted: response.data.predicted });

  } catch (err) {
    console.error("Yield Prediction Error:", err.response?.data || err.message);
    return res.status(500).json({
      error: "Yield prediction failed",
      details: err.response?.data?.error || err.message
    });
  }
};

// ================= DATASET UPLOAD =================
export const uploadDataset = (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Dataset file is required" });

  try {
    return res.json({ message: "Dataset uploaded successfully", path: req.file.path });
  } catch (err) {
    console.error("Dataset Upload Error:", err);
    return res.status(500).json({ error: "Failed to upload dataset", details: err.message });
  }
};