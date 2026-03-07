import path from "path";
import fs from "fs";

// Example: store uploaded CSV or images
export const handleUpload = (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    res.status(200).json({ message: "File uploaded successfully", filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};