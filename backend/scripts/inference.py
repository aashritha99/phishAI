import os
import joblib
import pandas as pd
import numpy as np
from scripts.url_feature_extractor import extract_url_features
from scripts.email_feature_extraction import extract_email_features
from huggingface_hub import hf_hub_download
import warnings
warnings.filterwarnings("ignore", message="X has feature names")

# ------------------------------
# Hugging Face Repo Info
# ------------------------------
HF_REPO = "amy45/model"

# ------------------------------
# Global Lazy Variables
# ------------------------------
tfidf_vectorizer = None
url_scaler = None
URL_FEATURE_COLUMNS = None
EMAIL_FEATURE_COLUMNS = None

email_rf_model = None
email_lr_model = None
url_rf_model = None
url_lr_model = None

# ------------------------------
# Helper: Lazy load from Hugging Face
# ------------------------------
def load_from_hf(filename):
    """Download file from Hugging Face and load using joblib."""
    try:
        local_path = hf_hub_download(repo_id=HF_REPO, filename=filename)
        return joblib.load(local_path)
    except Exception as e:
        print(f"⚠️  Failed to load {filename} from HF: {e}")
        return None

# ------------------------------
# Lazy Model Loader
# ------------------------------
def load_models(model_type):
    global tfidf_vectorizer, url_scaler, URL_FEATURE_COLUMNS, EMAIL_FEATURE_COLUMNS
    global email_rf_model, email_lr_model, url_rf_model, url_lr_model

    if model_type == "email":
        if email_rf_model is None or email_lr_model is None:
            print("📦 Loading Email Models from HF...")
            tfidf_vectorizer = load_from_hf("tfidf_vectorizer.pkl")
            # ⚠️ skip EMAIL_FEATURE_COLUMNS if not needed
            email_rf = load_from_hf("email_rf_model.pkl")
            email_lr = load_from_hf("email_lr_model.pkl")
            if email_rf and email_lr:
                email_rf_model = email_rf
                email_lr_model = email_lr
                print("✅ Email models loaded successfully.\n")

    elif model_type == "url":
        if url_rf_model is None or url_lr_model is None:
            print("📦 Loading URL Models from HF...")
            url_scaler = load_from_hf("url_scaler.pkl")
            URL_FEATURE_COLUMNS = load_from_hf("url_feature_columns.pkl")
            url_rf = load_from_hf("url_rf_model.pkl")
            url_lr = load_from_hf("url_lr_model.pkl")
            if url_rf and url_lr:
                url_rf_model = url_rf
                url_lr_model = url_lr
                print("✅ URL models loaded successfully.\n")

# ------------------------------
# Label Map
# ------------------------------
LABEL_MAP = {0: "Safe", 1: "Phishing/Malicious"}

# ------------------------------
# Email Prediction
# ------------------------------
def predict_email(text, model_type="rf"):
    try:
        load_models("email")  # ✅ load only when needed
        features_df = extract_email_features(text)

        if EMAIL_FEATURE_COLUMNS is not None:
            features_df = features_df.reindex(columns=EMAIL_FEATURE_COLUMNS, fill_value=0)

        model = email_rf_model if model_type == "rf" else email_lr_model
        proba = model.predict_proba(features_df)[0]
        phishing_prob = float(proba[1])

        pred = 1 if phishing_prob >= 0.7 else 0
        confidence = float(round(max(phishing_prob, 1 - phishing_prob) * 100, 2))

        return {"label": LABEL_MAP[pred], "confidence": confidence}
    except Exception as e:
        return {"label": "Error", "confidence": 0.0, "error": str(e)}

# ------------------------------
# URL Prediction
# ------------------------------
def predict_url(url_string, model_type="rf"):
    try:
        load_models("url")  # ✅ load only when needed
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
        return rf if rf["confidence"] >= lr["confidence"] else lr
    elif input_type == "url":
        return predict_url(input_data)
    else:
        raise ValueError("Invalid input_type. Must be 'email' or 'url'.")

# ------------------------------
# Test Run (optional)
# ------------------------------
if __name__ == "__main__":
    print("\n--- Inference Test Run ---")

    email_mal = """Dear Aspirant,
    You’ve just unlocked access to an exclusive PowerBI Masterclass led by Anjali Pandey (Data Scientist, Accenture) —
    where you’ll learn to build professional dashboards from scratch and earn your verified certificate of completion!
    REGISTER NOW!"""

    email_legit = "Meeting Reminder: The team sync-up is scheduled for 2:30 PM today on Google Meet."

    print("📧 Email (Malicious):", predict(email_mal, "email"))
    print("📧 Email (Legit):", predict(email_legit, "email"))

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
