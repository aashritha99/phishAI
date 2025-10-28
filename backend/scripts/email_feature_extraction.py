import re
import pandas as pd

def clean_email_text(text: str) -> str:
    if not isinstance(text, str):
        return ""
    
    text = text.lower()
    text = re.sub(r"http\S+", " ", text)      # remove URLs
    text = re.sub(r"www\S+", " ", text)
    text = re.sub(r"\S+@\S+", " ", text)      # remove email addresses
    text = re.sub(r"[^a-z0-9\s]", " ", text)  # remove special chars
    text = re.sub(r"\s+", " ", text).strip()  # normalize spaces
    return text


def extract_email_features(email_text: str) -> pd.DataFrame:
    """
    Takes in raw email text and returns a DataFrame with one column 'clean_text'
    — consistent with the TF-IDF vectorizer used in training.
    """
    clean_text = clean_email_text(email_text)
    return pd.DataFrame({"clean_text": [clean_text]})
