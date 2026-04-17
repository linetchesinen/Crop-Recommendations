import express from "express";
import rateLimit from "express-rate-limit";
import {
  createContact,
  getContacts
} from "../controllers/contactController.js";

const router = express.Router();

// ✅ Rate limiter
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: "Too many requests. Try again later."
  }
});

// ✅ CLEAN ROUTES
router.post("/", contactLimiter, createContact);
router.get("/", getContacts);

export default router;