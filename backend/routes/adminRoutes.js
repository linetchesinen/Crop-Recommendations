import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { adminDashboard } from "../controllers/adminController.js";

const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

export default router;