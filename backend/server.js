
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import cropRoutes from "./routes/cropRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import datasetRoutes from "./routes/datasetRoutes.js";
import predictRoutes from "./routes/predictRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";


const app = express();

// ================= DATABASE =================
connectDB();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================

// Authentication
app.use("/api/auth", authRoutes);

// Farmer Dashboard
app.use("/api/dashboard", dashboardRoutes);

// Admin Dashboard
app.use("/api/admin", adminRoutes);

// Crop + ML
app.use("/api/crops", cropRoutes);

// Weather API
app.use("/api/weather", weatherRoutes);
// Prediction API

app.use("/api/predict", predictRoutes);

// Dataset
app.use("/api/dataset", datasetRoutes);

// Contact
app.use("/api/contact", contactRoutes);


// Root
app.get("/", (req, res) => {
  res.send("🌱 AI Crop Recommendation API Running");
});

// ================= SERVER =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});