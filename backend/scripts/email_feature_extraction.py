# backend/scripts/email_feature_extraction.py

import re
import pandas as pd
import string
import os
import joblib

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(os.path.dirname(CURRENT_DIR))
FEATURES_DIR = os.path.join(PROJECT_ROOT, "dataset", "features")

TFIDF_PATH = os.path.join(FEATURES_DIR, "tfidf_vectorizer.pkl")
tfidf_vectorizer = joblib.load(TFIDF_PATH)

def clean_email_text(text: str) -> str:
    if not isinstance(text, str):
        text = str(text)
    text = text.lower()
    text = re.sub(r"http\S+|www\S+", " url ", text)
    text = re.sub(r"\d+", " number ", text)
    text = text.translate(str.maketrans("", "", string.punctuation))
    text = re.sub(r"\s+", " ", text).strip()
    return text

def extract_email_features(email_text: str) -> pd.DataFrame:
    clean_text = clean_email_text(email_text)
    X_tfidf = tfidf_vectorizer.transform([clean_text])
    feature_names = tfidf_vectorizer.get_feature_names_out()
    df_features = pd.DataFrame(X_tfidf.toarray(), columns=feature_names)
    return df_features
