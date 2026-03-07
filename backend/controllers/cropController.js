import Dataset from "../models/Dataset.js";
import Prediction from "../models/Prediction.js";
import { predictYield } from "../ml/predict.js";

// Store dataset
export const uploadDataset = async (req, res) => {
  try {
    const data = req.body;
    const dataset = await Dataset.create(data);
    res.status(201).json({ message: "Dataset saved", dataset });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Predict crop yield
export const predictCropYield = async (req, res) => {
  try {
    const data = req.body;
    const predictedYield = await predictYield(data); // Calls Python ML model
    const prediction = await Prediction.create({ ...data, user: req.user.id, predictedYield });
    res.status(200).json({ predictedYield, prediction });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};