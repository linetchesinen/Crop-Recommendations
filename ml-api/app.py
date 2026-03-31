from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# ================= ROOT =================
@app.route("/")
def home():
    return "Crop Recommendation API is running. Use /predict or /api/predict endpoints."

# ================= LOAD MODELS =================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

crop_model = joblib.load(os.path.join(BASE_DIR, "crop_model.pkl"))
yield_model = joblib.load(os.path.join(BASE_DIR, "yield_model.pkl"))
le = joblib.load(os.path.join(BASE_DIR, "label_encoder.pkl"))

# ================= CROP RECOMMENDATION =================
@app.route("/predict", methods=["POST"])
def predict_crop():
    data = request.json
    required_fields = ["temperature", "rainfall", "soilPh", "nitrogen", "phosphorus", "potassium"]

    for field in required_fields:
        if field not in data or data[field] == "":
            return jsonify({"error": f"{field} is required"}), 400

    try:
        features = np.array([[float(data[f]) for f in required_fields]])
        pred = crop_model.predict(features)[0]
        probs = crop_model.predict_proba(features)[0]
        classes = crop_model.classes_
        top_idx = probs.argsort()[-3:][::-1]
        recs = [{"crop": classes[i], "confidence": round(probs[i]*100, 2)} for i in top_idx]

        return jsonify({
            "recommendation": pred,
            "recommendations": recs
        })

    except Exception as e:
        print("Crop Prediction Error:", str(e))
        return jsonify({"error": str(e)}), 500

# ================= YIELD PREDICTION =================
@app.route("/api/predict", methods=["POST"])
def predict_yield():
    data = request.json
    required_fields = ["temperature", "rainfall", "soilPh", "nitrogen", "phosphorus", "potassium", "cropType"]

    for field in required_fields:
        if field not in data or data[field] == "":
            return jsonify({"error": f"{field} is required"}), 400

    try:
        crop_encoded = le.transform([data["cropType"]])[0]
        features = np.array([[
            float(data["temperature"]),
            float(data["rainfall"]),
            float(data["soilPh"]),
            float(data["nitrogen"]),
            float(data["phosphorus"]),
            float(data["potassium"]),
            crop_encoded
        ]])
        pred = yield_model.predict(features)[0]
        return jsonify({"predicted": round(float(pred), 2)})

    except Exception as e:
        print("Yield Prediction Error:", str(e))
        return jsonify({"error": str(e)}), 500

# ================= RUN SERVER =================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)