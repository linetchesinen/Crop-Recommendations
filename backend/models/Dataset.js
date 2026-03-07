import mongoose from "mongoose";

const datasetSchema = new mongoose.Schema({
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
  yield: { type: Number } // Optional if it's a training dataset
}, { timestamps: true });

export default mongoose.model("Dataset", datasetSchema);