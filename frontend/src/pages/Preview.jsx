import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";   // IMPORTANT
import Sidebar from "../components/Sidebar";  // ✅ ADD THIS

export default function Preview() {
  const navigate = useNavigate(); // ✅ ADD THIS

  const [uploadedData, setUploadedData] = useState(null);
  const [columns, setColumns] = useState([]);
  const [fileName, setFileName] = useState("");

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    logoutUser();
    navigate("/");
  };

  // ================= FILE UPLOAD =================
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;

      const rows = text.split("\n").map((row) => row.split(","));

      if (rows.length > 0) {
        setColumns(rows[0]);
        setUploadedData(rows.slice(1));
      }
    };

    reader.readAsText(file);
  };

  const triggerFileInput = () => {
    document.getElementById("dataset-upload").click();
  };

  return (
    <div className="flex min-h-screen bg-green-50 w-full bg-[url('/public/images/6.jpg')] bg-cover bg-center bg-no-repeat h-screen">
      {/* Sidebar */}
      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full">
        {/* Navbar */}
        

        {/* ================= MAIN ================= */}
        <main className="flex-1 p-10 flex items-center justify-center">

          {!uploadedData ? (
            /* EMPTY STATE */
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-lg w-full text-center">
              <h2 className="text-3xl font-bold text-green-800 mb-3">
                No Dataset Yet
              </h2>

              <p className="text-gray-600 mb-8">
                Upload dataset from Upload page or here to preview it
              </p>

              <button
                onClick={triggerFileInput}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Upload Dataset
              </button>

              <input
                type="file"
                id="dataset-upload"
                accept=".csv"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          ) : (
            /* PREVIEW TABLE */
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full">
              <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-green-800">
                  Dataset Preview: {fileName}
                </h2>

                <button
                  onClick={triggerFileInput}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                >
                  Upload New
                </button>

                <input
                  type="file"
                  id="dataset-upload"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full border">
                  <thead className="bg-green-100">
                    <tr>
                      {columns.map((col, idx) => (
                        <th key={idx} className="p-3 border text-left">{col}</th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {uploadedData.slice(0, 10).map((row, r) => (
                      <tr key={r} className="hover:bg-gray-50">
                        {row.map((cell, c) => (
                          <td key={c} className="p-3 border">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-500 mt-4">
                Showing first 10 rows of {uploadedData.length}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
