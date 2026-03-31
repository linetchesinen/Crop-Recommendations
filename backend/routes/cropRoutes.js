import express from "express";
import multer from "multer";
import {
  uploadDataset,
  predictCropYield,
  recommendCrop
} from "../controllers/cropController.js";

const router = express.Router();

// 📁 Configure file upload
const upload = multer({ dest: "uploads/" });

// Dataset upload + bulk prediction
router.post("/upload", upload.single("file"), uploadDataset);

// Yield prediction
router.post("/predict", predictCropYield);

// Crop recommendation
router.post("/recommend", recommendCrop);

export default router;