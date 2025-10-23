# scripts/inference.py

import pandas as pd
import joblib
import os
import numpy as np

# ------------------------------
# Paths
# ------------------------------
FEATURES_DIR = os.path.join(os.getcwd(), "dataset", "features")
MODELS_DIR = os.path.join(os.getcwd(), "models")

TFIDF_VECTORIZER = os.path.join(FEATURES_DIR, "tfidf_vectorizer.pkl")
URL_SCALER = os.path.join(FEATURES_DIR, "url_scaler.pkl")

# ------------------------------
# Load models
# ------------------------------
email_rf_model = joblib.load(os.path.join(MODELS_DIR, "email_rf_model.pkl"))
email_lr_model = joblib.load(os.path.join(MODELS_DIR, "email_lr_model.pkl"))
url_rf_model = joblib.load(os.path.join(MODELS_DIR, "url_rf_model.pkl"))
url_lr_model = joblib.load(os.path.join(MODELS_DIR, "url_lr_model.pkl"))

# Load vectorizer and scaler
tfidf_vectorizer = joblib.load(TFIDF_VECTORIZER)
url_scaler = joblib.load(URL_SCALER)

# ------------------------------
# Label mapping
# ------------------------------
LABEL_MAP = {0: "Safe", 1: "Phishing/Malicious"}

# ------------------------------
# Email Prediction
# ------------------------------
def predict_email(text, model_type="rf"):
    X = tfidf_vectorizer.transform([text])
    if model_type == "rf":
        proba = email_rf_model.predict_proba(X)[0]
        pred = email_rf_model.predict(X)[0]
    elif model_type == "lr":
        proba = email_lr_model.predict_proba(X)[0]
        pred = email_lr_model.predict(X)[0]
    else:
        raise ValueError("Invalid model_type, must be 'rf' or 'lr'")
    
    confidence = float(round(np.max(proba) * 100, 2))
    return {"label": LABEL_MAP[pred], "confidence": confidence}

# ------------------------------
# URL Prediction
# ------------------------------
def predict_url(url_series, model_type="rf"):
    # Extract numeric features from CSV column order
    df_template = pd.read_csv(os.path.join(os.getcwd(), "dataset", "processed", "urls_train.csv"))
    feature_cols = [c for c in df_template.columns if c != "CLASS_LABEL"]

    df_features = pd.DataFrame(columns=feature_cols)
    df_features.loc[0] = 0  # initialize row

    # Simple feature extraction for the example URL
    df_features.loc[0, "length"] = len(url_series[0])
    df_features.loc[0, "num_at"] = url_series[0].count("@")
    df_features.loc[0, "num_dots"] = url_series[0].count(".")
    df_features.loc[0, "num_equal"] = url_series[0].count("=")
    df_features.loc[0, "num_http"] = url_series[0].count("http")
    df_features.loc[0, "num_https"] = url_series[0].count("https")
    df_features = df_features.fillna(0)

    # Align columns and scale
    X_scaled = url_scaler.transform(df_features[feature_cols])

    if model_type == "rf":
        proba = url_rf_model.predict_proba(X_scaled)[0]
        pred = url_rf_model.predict(X_scaled)[0]
    elif model_type == "lr":
        proba = url_lr_model.predict_proba(X_scaled)[0]
        pred = url_lr_model.predict(X_scaled)[0]
    else:
        raise ValueError("Invalid model_type, must be 'rf' or 'lr'")

    confidence = float(round(np.max(proba) * 100, 2))
    return {"label": LABEL_MAP[pred], "confidence": confidence}

# ------------------------------
# Unified Predict Function
# ------------------------------
def predict(input_data, input_type="email"):
    if input_type == "email":
        rf_result = predict_email(input_data, model_type="rf")
        lr_result = predict_email(input_data, model_type="lr")
    elif input_type == "url":
        rf_result = predict_url([input_data], model_type="rf")
        lr_result = predict_url([input_data], model_type="lr")
    else:
        raise ValueError("Invalid input_type, must be 'email' or 'url'")

    # Return the one with higher confidence
    if rf_result['confidence'] >= lr_result['confidence']:
        return {"label": rf_result['label'], "confidence": rf_result['confidence']}
    else:
        return {"label": lr_result['label'], "confidence": lr_result['confidence']}
    
# ------------------------------
# Main Test Run
# ------------------------------
if __name__ == "__main__":
    email_example = "Congratulations! You won a prize. Click here to claim."
    url_example = "http://malicious-example.com/login"

    email_pred = predict(email_example, input_type="email")
    url_pred = predict(url_example, input_type="url")

    print("📧 Email Prediction:", email_pred)
    print("🌐 URL Prediction:", url_pred)
