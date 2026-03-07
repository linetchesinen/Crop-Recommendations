import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Upload() {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const nav = useNavigate();

  // ---------- DRAG ----------
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files[0]) setSelectedFile(e.dataTransfer.files[0]);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) setSelectedFile(e.target.files[0]);
  };

  // ---------- UPLOAD TO BACKEND ----------
  const handleUpload = async () => {
    if (!selectedFile) return alert("Select file first");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      setUploading(true);

      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert("Upload successful");
      nav("/dashboard");
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const browseClick = () => document.getElementById("fileInput").click();

  return (
    <div className="flex flex-col min-h-screen bg-green-50 bg-[url('/public/images/3.jpg')] bg-cover bg-center bg-no-repeat">
      {/* NAVBAR */}
      <nav className="bg-teal-700 text-white px-6 py-6 flex justify-between">
        <h1 className="font-bold text-xl">AgriTech Kenya</h1>

        <div className="flex gap-6 hover:bg-teal-800 px-4 py-1 rounded-lg transition">
          <Link to="/dashboard" className="hover:text-orange-300">
            Home
          </Link>
          <Link to="/upload" className="hover:text-orange-300">
            Upload
          </Link>
          <Link to="/preview" className="hover:text-orange-300">
            Preview
          </Link>
          <Link to="/yieldPrediction" className="hover:text-orange-300">
            Yield Prediction
          </Link>
          <Link to="/cropRecommendation" className="hover:text-orange-300">
            Crop Recommendation
          </Link>
          <Link to="/weatherforecast" className="hover:text-orange-300">
            Weather Forecast
          </Link>
          <Link to="/weatherreport" className="hover:text-orange-300">
            Weather Report
          </Link>
          <Link to="/charts" className="hover:text-orange-300">
            Charts
          </Link>
          <Link
            to="/"
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-1 rounded-md transition"
          >
            Logout
          </Link>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="flex-1 max-w-5xl mx-auto p-8">
        <h1 className="text-3xl font-bold text-green-900 mb-6">
          Upload Training Dataset
        </h1>

        {/* CARD */}
        <div className="bg-white p-8 rounded-xl shadow">
          <p className="text-black mb-6">
            Upload datasets to train ML models for crop prediction.
          </p>

          {/* DRAG AREA */}
          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              dragActive ? "border-green-700 bg-green-50" : "border-gray-300"
            }`}
          >
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />

            {selectedFile ? (
              <p className="text-green-700 font-semibold">
                {selectedFile.name}
              </p>
            ) : (
              <>
                <p className="mb-4">Drag & drop dataset here</p>
                <button
                  onClick={browseClick}
                  className="bg-black text-white px-6 py-2 rounded"
                >
                  Browse
                </button>
              </>
            )}
          </div>

          {/* BUTTON */}
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-6 bg-black text-white px-8 py-3 rounded w-full"
          >
            {uploading ? "Uploading..." : "Upload Dataset"}
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-600">
        © 2026 AgriTech Kenya. Empowering farmers with technology.
      </footer>
    </div>
  );
}