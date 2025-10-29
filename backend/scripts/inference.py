import os
import joblib
import pandas as pd
import numpy as np
from scripts.url_feature_extractor import extract_url_features
from scripts.email_feature_extraction import extract_email_features
import warnings
warnings.filterwarnings("ignore", message="X has feature names")


# ------------------------------
# Paths
# ------------------------------
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.dirname(CURRENT_DIR)
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)

FEATURES_DIR = os.path.join(PROJECT_ROOT, "dataset", "features")
MODELS_DIR = os.path.join(PROJECT_ROOT, "models")

TFIDF_VECTORIZER = os.path.join(FEATURES_DIR, "tfidf_vectorizer.pkl")
URL_SCALER = os.path.join(FEATURES_DIR, "url_scaler.pkl")
URL_FEATURE_COLUMNS_FILE = os.path.join(FEATURES_DIR, "url_feature_columns.pkl")
EMAIL_FEATURE_COLUMNS_FILE = os.path.join(FEATURES_DIR, "email_feature_columns.pkl")

# ------------------------------
# Load assets
# ------------------------------
try:
    tfidf_vectorizer = joblib.load(TFIDF_VECTORIZER)
    url_scaler = joblib.load(URL_SCALER)
    URL_FEATURE_COLUMNS = joblib.load(URL_FEATURE_COLUMNS_FILE)
    EMAIL_FEATURE_COLUMNS = (
        joblib.load(EMAIL_FEATURE_COLUMNS_FILE)
        if os.path.exists(EMAIL_FEATURE_COLUMNS_FILE)
        else None
    )
    print(f"✅ Loaded TF-IDF, scaler, and {len(URL_FEATURE_COLUMNS)} URL features.")
except Exception as e:
    print(f"❌ Error loading feature assets: {e}")

try:
    email_rf_model = joblib.load(os.path.join(MODELS_DIR, "email_rf_model.pkl"))
    email_lr_model = joblib.load(os.path.join(MODELS_DIR, "email_lr_model.pkl"))
    url_rf_model = joblib.load(os.path.join(MODELS_DIR, "url_rf_model.pkl"))
    url_lr_model = joblib.load(os.path.join(MODELS_DIR, "url_lr_model.pkl"))
    print("✅ Models loaded successfully.\n")
except Exception as e:
    print(f"❌ Error loading models: {e}")

# ------------------------------
# Label Map
# ------------------------------
LABEL_MAP = {0: "Safe", 1: "Phishing/Malicious"}

# ------------------------------
# Email Prediction
# ------------------------------
def predict_email(text, model_type="rf"):
    try:
        # ✅ Step 1: Extract TF-IDF features as DataFrame
        features_df = extract_email_features(text)

        # ✅ Step 2: Align columns if feature list available
        if EMAIL_FEATURE_COLUMNS is not None:
            features_df = features_df.reindex(columns=EMAIL_FEATURE_COLUMNS, fill_value=0)

        # ✅ Step 3: Choose model
        model = email_rf_model if model_type == "rf" else email_lr_model

        # ✅ Step 4: Predict probabilities
        proba = model.predict_proba(features_df)[0]
        phishing_prob = float(proba[1])

        # ✅ Step 5: Apply calibrated threshold
        pred = 1 if phishing_prob >= 0.7 else 0
        confidence = float(round(max(phishing_prob, 1 - phishing_prob) * 100, 2))

        # print(f"📧 Email raw probs: {np.round(proba, 3)} | phishing_prob: {phishing_prob:.3f} | Label: {LABEL_MAP[pred]}")
        return {"label": LABEL_MAP[pred], "confidence": confidence}

    except Exception as e:
        return {"label": "Error", "confidence": 0.0, "error": str(e)}

# ------------------------------
# URL Prediction
# ------------------------------
def predict_url(url_string, model_type="rf"):
    try:
        df_features = extract_url_features(url_string)
        df_features = df_features.fillna(0)
        df_features = df_features[URL_FEATURE_COLUMNS]

        X_scaled = url_scaler.transform(df_features)
        model = url_rf_model if model_type == "rf" else url_lr_model

        proba = model.predict_proba(X_scaled)[0]
        phishing_prob = float(proba[1])

        pred = 1 if phishing_prob >= 0.75 else 0
        confidence = float(round(max(phishing_prob, 1 - phishing_prob) * 100, 2))

        return {"label": LABEL_MAP[pred], "confidence": confidence}

    except Exception as e:
        return {"label": "Error", "confidence": 0.0, "error": str(e)}

# ------------------------------
# Unified Predict Function
# ------------------------------
def predict(input_data, input_type="email"):
    if input_type == "email":
        rf = predict_email(input_data, "rf")
        lr = predict_email(input_data, "lr")
    elif input_type == "url":
        return predict_url(input_data)
    else:
        raise ValueError("Invalid input_type. Must be 'email' or 'url'.")

    # Return whichever model is more confident
    return rf if rf["confidence"] >= lr["confidence"] else lr

# ------------------------------
# Test Run
# ------------------------------
if __name__ == "__main__":
    print("\n--- Inference Test Run ---")

    # Email samples
    email_mal = """Dear Aspirant,

        You’ve just unlocked access to an exclusive PowerBI Masterclass led by Anjali Pandey (Data Scientist, Accenture) — where you’ll learn to build professional dashboards from scratch and earn your verified certificate of completion!

        Session Details :

        📅 Date: Oct 24, 2025
        ⏰ Time: 7:00 PM

        🎓 Certificate: Yes, available for all attendees

        REGISTER NOW
        Good Luck !

        Warm regards"""
    email_legit = "Meeting Reminder: The team sync-up is scheduled for 2:30 PM today on Google Meet.  Please be on time."
    print("📧 Email (Malicious):", predict(email_mal, "email"))
    print("📧 Email (Legit):", predict(email_legit, "email"))

    # URL samples
    urls = [
        "https://www.facebook.com/",
        "http://login-paypal-security.com/account/verify",
        "https://google.com",
        "http://update-apple.com.verify-login.co",
        "https://secure.icicibank.com/login"
    ]

    print(f"\n🌐 Running prediction on {len(urls)} URL samples...")
    for i, u in enumerate(urls, 1):
        print(f"🔗 URL {i}: {predict(u, 'url')}")

    print("\n--- Test Run Complete ---")
