import React, { useState } from "react";

export default function UploadTrain() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [trainingResults, setTrainingResults] = useState([]);

  // ---------- DRAG & DROP ----------
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  const browseClick = () => {
    document.getElementById("fileInput").click();
  };

  // ---------- FILE VALIDATION ----------
  const validateFile = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB limit
    if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
      setMessage("❌ Invalid file type. Please upload a CSV file.");
      setSelectedFile(null);
      return false;
    }
    if (file.size > maxSize) {
      setMessage("❌ File too large. Maximum size is 5MB.");
      setSelectedFile(null);
      return false;
    }
    // Optional: check CSV headers (first line)
    const reader = new FileReader();
    reader.onload = (e) => {
      const firstLine = e.target.result.split("\n")[0];
      if (!firstLine.includes(",")) {
        setMessage("❌ CSV file seems malformed (no commas found).");
        setSelectedFile(null);
        return false;
      } else {
        setMessage(""); // clear any previous errors
        setSelectedFile(file);
      }
    };
    reader.readAsText(file);
  };

  // ---------- UPLOAD & TRAIN ----------
  const handleTrain = async () => {
    if (!selectedFile) {
      alert("Please select a CSV file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);
      setMessage("Uploading dataset and training the model...");
      setTrainingResults([]);

      const response = await fetch("http://localhost:3000/api/crops/train", {
        method: "POST",
        body: formData,
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server did not return valid JSON");
      }

      if (!response.ok) {
        throw new Error(data.message || "Training failed");
      }

      setTrainingResults(data.results || []);
      setMessage("✅ Model trained successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Training failed. Check backend connection.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-50 p-8">
      <h1 className="text-3xl font-bold text-green-900 mb-6">
        Upload Dataset to Train Model
      </h1>

      <div className="bg-white p-8 rounded-xl shadow max-w-3xl mx-auto">
        <p className="text-black mb-4">
          Upload a CSV file to train the AI model for crop predictions.
        </p>

        {/* DRAG & DROP */}
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center mb-6 transition ${
            dragActive ? "border-green-700 bg-green-50" : "border-gray-300"
          }`}
        >
          <input
            id="fileInput"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
          {selectedFile ? (
            <p className="text-green-700 font-semibold">📄 {selectedFile.name}</p>
          ) : (
            <>
              <p className="mb-4">Drag & drop your CSV file here</p>
              <button
                onClick={browseClick}
                className="bg-black text-white px-6 py-2 rounded"
              >
                Browse
              </button>
            </>
          )}
        </div>

        {/* TRAIN BUTTON */}
        <button
          onClick={handleTrain}
          disabled={uploading || !selectedFile}
          className="bg-black text-white px-8 py-3 rounded w-full mb-4"
        >
          {uploading ? "Processing..." : "Upload & Train the Model"}
        </button>

        {/* MESSAGE */}
        {message && (
          <p className="text-green-700 mb-4 text-center">{message}</p>
        )}

        {/* RESULTS */}
        {trainingResults.length > 0 && (
          <div className="bg-green-100 p-4 rounded mt-4">
            <h2 className="font-bold mb-2">Training Results:</h2>
            <ul className="list-disc list-inside">
              {trainingResults.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}