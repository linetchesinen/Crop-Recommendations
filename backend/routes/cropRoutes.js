import express from "express";
import { uploadDataset, predictCropYield } from "../controllers/cropController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/upload", protect, uploadDataset);
router.post("/predict", protect, predictCropYield);

export default router;