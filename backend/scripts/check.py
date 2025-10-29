import joblib
import numpy as np
import os
import pandas as pd
from url_feature_extractor import extract_url_features
from inference import predict

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# This gets /absolute/path/to/PishAI/backend
BACKEND_DIR = os.path.dirname(CURRENT_DIR)

# Go up one level to reach /absolute/path/to/PishAI
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)

FEATURES_DIR = os.path.join(PROJECT_ROOT, "dataset", "features")

MODEL_DIR = os.path.join(PROJECT_ROOT, "models" )
#print("Classes:", model.classes_)

#X_train, y_train = joblib.load(os.path.join(PROJECT_ROOT, "dataset", "features", "urls_train_features.pkl"))

#print("✅ Feature matrix shape:", X_train.shape)
#print("✅ Labels shape:", y_train.shape)

# Check class balance
#print("\n📊 Label distribution:")
#print(y_train.value_counts())

# Optional: check label encoding
#print("\n🔢 Unique label values:", y_train.unique())
#from inference import extract_url_features
#print(extract_url_features("https://www.facebook.com/").head())

# """ url = "https://secure-login-paypal.com/verify"

# features_df = extract_url_features(url)
# print(features_df.head())
# print("✅ Total features extracted:", features_df.shape[1])

# features = features_df.iloc[0].to_dict()
# print("Feature columns:", list(features.keys()))
# print("Total features:", len(features)) """

# df = pd.read_csv(os.path.join(PROJECT_ROOT, "dataset", "processed", "urls_train.csv"))
# print(df.columns.tolist())
# print(df.head(2))

# df = extract_url_features("http://secure-login-paypal.com/verify")
# train_cols = joblib.load(os.path.join(FEATURES_DIR,  "url_feature_columns.pkl"))

# print("✅ Feature count:", df.shape[1])
# print("✅ Columns match:", df.columns.equals(pd.Index(train_cols)))
# print(df.head().T)

# model= joblib.load(os.path.join(MODEL_DIR, "url_rf_model.pkl"))
# scaler= joblib.load(os.path.join(FEATURES_DIR, "url_scaler.pkl"))
# cols= joblib.load(os.path.join(FEATURES_DIR, "url_feature_columns.pkl"))

# df=pd.read_csv(os.path.join(PROJECT_ROOT, "dataset", "processed", "urls_test.csv"))
# X = df[cols]
# y = df['CLASS_LABEL']

# # Scale & predict
# X_scaled = scaler.transform(X)
# preds = model.predict(X_scaled)
# probs = model.predict_proba(X_scaled)[:, 1]

# print("✅ Model output distribution:")
# print(pd.Series(preds).value_counts(normalize=True))
# print("🔥 Average predicted phishing probability:", np.mean(probs) * 100)

# print("Classes:", model.classes_)

# # Generate a random feature input (shape should match 49)
# random_input = np.random.rand(1, 49)
# print("Prediction:", model.predict(random_input))
# print("Prediction probabilities:", model.predict_proba(random_input))

# df=pd.read_csv(os.path.join(PROJECT_ROOT, "dataset", "processed", "urls_train.csv"))
# print(df["CLASS_LABEL"].value_counts(normalize=True))

# urls = [
#     "https://google.com",
#     "https://facebook.com",
#     "https://github.com",
#     "https://www.microsoft.com/en-in/",
#     "https://amazon.in"
# ]

# for url in urls:
#     print(url, "=>", predict(url, "url"))


from scripts.email_feature_extraction import extract_email_features
from scripts.inference import predict_email

emails = [
    "Your package will arrive tomorrow, track here: http://example.com",
    "Verify your bank account immediately or it will be blocked.",
    "Meeting scheduled for 3 PM today, please join on time."
]

for email in emails:
    print("\n--- EMAIL SAMPLE ---")
    print(email)
    features = extract_email_features(email)
    print("Feature shape:", features.shape)
    print(predict_email(email, model_type="rf"))
