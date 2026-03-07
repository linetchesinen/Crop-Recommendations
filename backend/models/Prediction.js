import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cropType: { type: String, required: true },
  farmArea: { type: Number, required: true },
  soilType: { type: String, required: true },
  rainfall: { type: Number, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  soilPh: { type: Number, required: true },
  nitrogen: { type: Number, required: true },
  phosphorus: { type: Number, required: true },
  potassium: { type: Number, required: true },
  predictedYield: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Prediction", predictionSchema);