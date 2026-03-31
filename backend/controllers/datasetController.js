export const uploadDataset = async (req, res) => {

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  res.json({
    message: "Dataset uploaded",
    file: req.file.filename
  });

};