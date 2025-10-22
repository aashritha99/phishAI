# scripts/data_preprocessing.py

import pandas as pd
import re
import os
from sklearn.model_selection import train_test_split
from tqdm import tqdm

# ------------------------------
# Config / Paths
# ------------------------------
RAW_DATA_DIR = os.path.join(os.getcwd(), "dataset", "raw")
PROCESSED_DATA_DIR = os.path.join(os.getcwd(), "dataset", "processed")
os.makedirs(PROCESSED_DATA_DIR, exist_ok=True)

TRAIN_RATIO = 0.8
RANDOM_STATE = 42

EMAIL_FILES = [
    "CEAS_08.csv",
    "Enron.csv",
    "Ling.csv",
    "Nazario.csv",
    "Nigerian_Fraud.csv",
    "phishing_email.csv",
    "SpamAssasin.csv"
]

URL_FILE = "URL_Phishing.csv"

# ------------------------------
# Helper Functions
# ------------------------------

def clean_email_text(text):
    if pd.isnull(text):
        return ""
    text = re.sub(r'<.*?>', ' ', text)           # Remove HTML tags
    text = re.sub(r'http\S+|www\S+', ' ', text) # Remove URLs
    text = re.sub(r'\S+@\S+', ' ', text)        # Remove emails
    text = re.sub(r'[^a-zA-Z0-9\s]', ' ', text) # Remove special chars
    text = text.lower()
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def detect_columns(df):
    """
    Auto-detect columns:
    - Text column: first object/string type
    - Label column: first column with <=20 unique values
    """
    text_col = None
    label_col = None

    for c in df.columns:
        if df[c].dtype == 'object' and text_col is None:
            text_col = c
        elif df[c].nunique() <= 20 and label_col is None:
            label_col = c
        if text_col and label_col:
            break

    return text_col, label_col

# ------------------------------
# Process Email Dataset
# ------------------------------
def process_email_dataset():
    print("Processing email datasets...")

    dfs = []
    skipped_files = []
    
    for file in tqdm(EMAIL_FILES, desc="Reading email CSVs"):
        path = os.path.join(RAW_DATA_DIR, file)
        if not os.path.exists(path):
            print(f"Warning: {file} not found in raw folder.")
            skipped_files.append(file)
            continue

        df = pd.read_csv(path)
        # Normalize column names
        df.columns = [str(c).strip().lower() for c in df.columns]
        df = df.loc[:, ~df.columns.duplicated()]

        # Detect text & label
        text_col, label_col = detect_columns(df)
        if text_col is None or label_col is None:
            print(f"Skipping {file}: could not detect text/label columns")
            skipped_files.append(file)
            continue

        # Keep only text and label columns
        df = df[[text_col, label_col]].rename(columns={text_col: 'text', label_col: 'label'})
        dfs.append(df)

    if not dfs:
        raise FileNotFoundError("No valid email CSVs found in raw folder.")

    emails_df = pd.concat(dfs, ignore_index=True)

    tqdm.pandas(desc="Cleaning email text")
    emails_df['clean_text'] = emails_df['text'].progress_apply(clean_email_text)

    train_df, test_df = train_test_split(
        emails_df,
        train_size=TRAIN_RATIO,
        random_state=RANDOM_STATE,
        stratify=emails_df['label']
    )

    train_df.to_csv(os.path.join(PROCESSED_DATA_DIR, "emails_train.csv"), index=False)
    test_df.to_csv(os.path.join(PROCESSED_DATA_DIR, "emails_test.csv"), index=False)

    print(f"Email dataset processed: {train_df.shape[0]} train, {test_df.shape[0]} test samples.")
    if skipped_files:
        print("Skipped files:", skipped_files)
    print("")

# ------------------------------
# Process URL Numeric Features Dataset
# ------------------------------
def process_url_dataset():
    print("Processing URL numeric features dataset...")
    path = os.path.join(RAW_DATA_DIR, URL_FILE)
    if not os.path.exists(path):
        print(f"URL file {URL_FILE} not found in raw folder.")
        return

    df = pd.read_csv(path)

    if 'CLASS_LABEL' not in df.columns:
        print(f"URL file: 'CLASS_LABEL' column not found. Skipping.")
        return

    # Train/test split
    train_df, test_df = train_test_split(
        df,
        train_size=TRAIN_RATIO,
        random_state=RANDOM_STATE,
        stratify=df['CLASS_LABEL']
    )

    # Save processed CSVs
    train_df.to_csv(os.path.join(PROCESSED_DATA_DIR, "urls_train.csv"), index=False)
    test_df.to_csv(os.path.join(PROCESSED_DATA_DIR, "urls_test.csv"), index=False)

    print(f"URL dataset processed: {train_df.shape[0]} train, {test_df.shape[0]} test samples.\n")

# ------------------------------
# Main
# ------------------------------
if __name__ == "__main__":
    process_email_dataset()
    process_url_dataset()
    print("All data preprocessing completed successfully.")
