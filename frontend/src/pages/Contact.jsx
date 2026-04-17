import React, { useState } from "react";

export default function ContactInfo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [submitting, setSubmitting] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setResponseMsg("❌ Please fill all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      setResponseMsg("Submitting contact information...");

      // ✅ CORRECT ENDPOINT
      const response = await fetch("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed");
      }

      setResponseMsg("✅ Contact information submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      console.error(error);
      setResponseMsg("❌ Failed to submit. Check backend.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-green-100 p-8">
      <h1 className="text-3xl font-bold text-green-900 mb-6 text-center">
        Contact Information
      </h1>

      <div className="bg-white p-8 rounded-xl shadow max-w-3xl mx-auto">
        <p className="text-black mb-6">
          Fill in your details and we will get back to you.
        </p>

        <div className="flex flex-col gap-4 mb-6">
          <input type="text" name="name" placeholder="Full Name"
            value={formData.name} onChange={handleChange}
            className="border p-3 rounded"
          />

          <input type="email" name="email" placeholder="Email Address"
            value={formData.email} onChange={handleChange}
            className="border p-3 rounded"
          />

          <input type="text" name="phone" placeholder="Phone Number"
            value={formData.phone} onChange={handleChange}
            className="border p-3 rounded"
          />

          <textarea name="message" placeholder="Your Message"
            value={formData.message} onChange={handleChange}
            className="border p-3 rounded h-32"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-black text-white px-8 py-3 rounded w-full"
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>

        {responseMsg && (
          <p className="text-green-700 mt-4 text-center">{responseMsg}</p>
        )}
      </div>
    </div>
  );
}