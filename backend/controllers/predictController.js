import axios from "axios";

// Forward request from frontend to model running on port 5000
export const predictYield = async (req, res) => {
  try {
    const {
      cropType,
      rainfall,
      temperature,
      humidity,
      soilPh,
      nitrogen,
      phosphorus,
      potassium
    } = req.body;

    // Validate input
    if (
      !cropType ||
      !rainfall ||
      !temperature ||
      !humidity ||
      !soilPh ||
      !nitrogen ||
      !phosphorus ||
      !potassium
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Convert numeric fields to numbers
    const payload = {
      cropType,
      rainfall: Number(rainfall),
      temperature: Number(temperature),
      humidity: Number(humidity),
      soilPh: Number(soilPh),
      nitrogen: Number(nitrogen),
      phosphorus: Number(phosphorus),
      potassium: Number(potassium)
    };

    console.log("Forwarding to model:", payload);

    // Send request to model server at port 5000
    const response = await axios.post("http://localhost:5000/predict", payload);

    // Forward model response to frontend
    res.json(response.data);

  } catch (err) {
    // Log full error from Axios
    console.error("Prediction error:", err.response?.data || err.message || err);

    res.status(500).json({
      message: "Failed to get prediction from model",
      error: err.response?.data || err.message
    });
  }
};