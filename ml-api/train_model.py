import pandas as pd
import joblib
import os

from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.preprocessing import LabelEncoder

print("🚀 STARTING TRAINING...")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# =========================
# 1. LOAD CROP DATA
# =========================

crop_path = r"C:\Users\Linet Kanyakera\Desktop\archive\Crop_recommendation.csv"
crop_data = pd.read_csv(crop_path)

crop_data.columns = crop_data.columns.str.strip().str.lower()

print("📊 Crop columns:", crop_data.columns)

X_crop = crop_data[['temperature', 'rainfall', 'ph', 'n', 'p', 'k']]
y_crop = crop_data['label']

crop_model = RandomForestClassifier(n_estimators=150, random_state=42)
crop_model.fit(X_crop, y_crop)

print("✅ Crop model trained")

# =========================
# 2. LOAD YIELD DATA
# =========================

yield_path = r"C:\Users\Linet Kanyakera\Downloads\archive\crop_yield_fertilizer_300.csv"
yield_data = pd.read_csv(yield_path)

yield_data.columns = yield_data.columns.str.strip().str.lower()

print("📊 Yield columns:", yield_data.columns)

# AUTO DETECT FUNCTION
def find_col(names):
    for col in yield_data.columns:
        for n in names:
            if n in col:
                return col
    return None

temp = find_col(["temp"])
rain = find_col(["rain"])
ph = find_col(["ph"])
n = find_col(["n"])
p = find_col(["p"])
k = find_col(["k"])
crop = find_col(["crop"])
yield_col = find_col(["yield", "production"])

# CHECK
required = [temp, rain, ph, n, p, k, crop, yield_col]
if None in required:
    raise Exception(f"❌ Missing columns. Found: {yield_data.columns}")

print("✅ Column mapping OK")

# ENCODE
le = LabelEncoder()
yield_data[crop] = le.fit_transform(yield_data[crop])

# TRAIN
X_yield = yield_data[[temp, rain, ph, n, p, k, crop]]
y_yield = yield_data[yield_col]

yield_model = RandomForestRegressor(n_estimators=150, random_state=42)
yield_model.fit(X_yield, y_yield)

print("✅ Yield model trained")

# =========================
# SAVE MODELS
# =========================

joblib.dump(crop_model, os.path.join(BASE_DIR, "crop_model.pkl"))
joblib.dump(yield_model, os.path.join(BASE_DIR, "yield_model.pkl"))
joblib.dump(le, os.path.join(BASE_DIR, "label_encoder.pkl"))

print("🎉 ALL MODELS SAVED SUCCESSFULLY")