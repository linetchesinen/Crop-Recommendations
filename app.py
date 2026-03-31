from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load models
crop_model = joblib.load("crop_model.pkl")
yield_model = joblib.load("yield_model.pkl")

# ----------------------------------
# CROP RECOMMENDATION
# ----------------------------------
@app.route("/predict", methods=["POST"])
def predict_crop():
    try:
        data = request.json

        features = np.array([[
            float(data["nitrogen"]),
            float(data["phosphorus"]),
            float(data["potassium"]),
            float(data["temperature"]),
            float(data["humidity"]),
            float(data["ph"]),
            float(data["rainfall"]),
            float(data["nitrogen"]) / (float(data["phosphorus"]) + 1),
            float(data["temperature"]) * float(data["humidity"])
        ]])

        prediction = crop_model.predict(features)[0]
        probs = crop_model.predict_proba(features)[0]
        classes = crop_model.classes_

        top_indices = probs.argsort()[-3:][::-1]

        top_recommendations = [
            {
                "crop": classes[i],
                "confidence": round(probs[i]*100, 2)
            }
            for i in top_indices
        ]

        return jsonify({
            "recommendation": prediction,
            "recommendations": top_recommendations
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ----------------------------------
# YIELD PREDICTION
# ----------------------------------
@app.route("/api/predict", methods=["POST"])
def predict_yield():
    try:
        data = request.json

        features = np.array([[
            float(data["nitrogen"]),
            float(data["phosphorus"]),
            float(data["potassium"]),
            float(data["temperature"]),
            float(data["humidity"]),
            float(data["soilPh"]),
            float(data["rainfall"])
        ]])

        prediction = yield_model.predict(features)[0]

        return jsonify({
            "predicted": round(float(prediction), 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)