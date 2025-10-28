# scripts/feature_engineering.py

import pandas as pd
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import StandardScaler
import joblib

# ------------------------------
# Config / Paths
# ------------------------------
# This gets /absolute/path/to/PishAI/backend/scripts
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# This gets /absolute/path/to/PishAI/backend
BACKEND_DIR = os.path.dirname(CURRENT_DIR)

# Go up one level to reach /absolute/path/to/PishAI
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)

PROCESSED_DATA_DIR = os.path.join(PROJECT_ROOT, "dataset", "processed")
FEATURES_DIR = os.path.join(PROJECT_ROOT, "dataset", "features")
os.makedirs(FEATURES_DIR, exist_ok=True)

EMAIL_TRAIN_FILE = os.path.join(PROCESSED_DATA_DIR, "emails_train.csv")
EMAIL_TEST_FILE = os.path.join(PROCESSED_DATA_DIR, "emails_test.csv")
URL_TRAIN_FILE = os.path.join(PROCESSED_DATA_DIR, "urls_train.csv")
URL_TEST_FILE = os.path.join(PROCESSED_DATA_DIR, "urls_test.csv")

# ------------------------------
# Email TF-IDF Features
# ------------------------------
def process_email_features():
    print("Processing email TF-IDF features...")

    train_df = pd.read_csv(EMAIL_TRAIN_FILE)
    test_df = pd.read_csv(EMAIL_TEST_FILE)

    train_texts = train_df['clean_text'].fillna('')
    test_texts = test_df['clean_text'].fillna('')

    vectorizer = TfidfVectorizer(max_features=5000)
    X_train = vectorizer.fit_transform(train_texts)
    X_test = vectorizer.transform(test_texts)

    joblib.dump(vectorizer, os.path.join(FEATURES_DIR, "tfidf_vectorizer.pkl"))
    joblib.dump((X_train, train_df['label']), os.path.join(FEATURES_DIR, "emails_train_features.pkl"))
    joblib.dump((X_test, test_df['label']), os.path.join(FEATURES_DIR, "emails_test_features.pkl"))

    print(f"Email features saved: {X_train.shape[0]} train samples, {X_test.shape[0]} test samples.\n")

# ------------------------------
# URL Numeric Features
# ------------------------------
def process_url_features():
    print("Processing URL numeric features...")

    train_df = pd.read_csv(URL_TRAIN_FILE)
    test_df = pd.read_csv(URL_TEST_FILE)

    y_train = train_df['CLASS_LABEL']
    y_test = test_df['CLASS_LABEL']

    X_train = train_df.drop(columns=['CLASS_LABEL'])
    X_test = test_df.drop(columns=['CLASS_LABEL'])

    feature_columns = list(X_train.columns)
    joblib.dump(feature_columns, os.path.join(FEATURES_DIR, "url_feature_columns.pkl"))

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    joblib.dump(scaler, os.path.join(FEATURES_DIR, "url_scaler.pkl"))

    joblib.dump((X_train_scaled, y_train), os.path.join(FEATURES_DIR, "urls_train_features.pkl"))
    joblib.dump((X_test_scaled, y_test), os.path.join(FEATURES_DIR, "urls_test_features.pkl"))

    print(f"URL features saved: {X_train_scaled.shape[0]} train samples, {X_test_scaled.shape[0]} test samples.\n")

# ------------------------------
# Main
# ------------------------------
if __name__ == "__main__":
    process_email_features()
    process_url_features()
    print("All feature engineering completed successfully.")
