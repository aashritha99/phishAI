import os
import joblib
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import json
import warnings
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)

# -----------------------------
# Suppress InconsistentVersionWarning
# -----------------------------
warnings.filterwarnings("ignore", category=UserWarning, module="sklearn")

# =====================================================
# PATH SETUP (CRITICAL FIX)
# =====================================================
# This gets /absolute/path/to/PishAI/backend/scripts
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# This gets /absolute/path/to/PishAI/backend
BACKEND_DIR = os.path.dirname(CURRENT_DIR)

# Go up one level to reach /absolute/path/to/PishAI
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)

FEATURES_DIR = os.path.join(PROJECT_ROOT, "dataset", "features")
MODELS_DIR = os.path.join(PROJECT_ROOT, "models")
OUTPUTS_DIR = os.path.join(PROJECT_ROOT, "outputs") # Use project root for outputs
os.makedirs(OUTPUTS_DIR, exist_ok=True)


# ------------------------------------------------
# ✅ Common evaluation function
# ------------------------------------------------
def evaluate_model(model_name, test_features_path, model_path, vectorizer_path=None, output_prefix="model"):
    print(f"\n🔹 Evaluating {model_name} Model...")

    # File existence check uses absolute paths
    if not os.path.exists(test_features_path):
        raise FileNotFoundError(f"❌ Test features not found at {test_features_path}")
    X_test, y_test = joblib.load(test_features_path)

    if not os.path.exists(model_path):
        raise FileNotFoundError(f"❌ Model not found at {model_path}")
    model = joblib.load(model_path)

    if vectorizer_path and os.path.exists(vectorizer_path) and isinstance(X_test, pd.Series):
        vectorizer = joblib.load(vectorizer_path)
        X_test = vectorizer.transform(X_test) 

    y_pred = model.predict(X_test)

    accuracy = accuracy_score(y_test, y_pred) * 100
    precision = precision_score(y_test, y_pred, average='weighted', zero_division=0) * 100
    recall = recall_score(y_test, y_pred, average='weighted', zero_division=0) * 100
    f1 = f1_score(y_test, y_pred, average='weighted', zero_division=0) * 100

    print(f"\n📊 {model_name} Model Results:")
    print("----------------------------------")
    print(f"✅ Accuracy : {accuracy:.2f}%")
    print(f"✅ Precision: {precision:.2f}%")
    print(f"✅ Recall   : {recall:.2f}%")
    print(f"✅ F1-Score : {f1:.2f}%")

    print("\n📋 Classification Report:")
    print(classification_report(y_test, y_pred))

    # Handles labels dynamically for proper matrix plotting
    labels = sorted(list(set(y_test)))
    cm = confusion_matrix(y_test, y_pred, labels=labels)
    plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=labels, yticklabels=labels)
    plt.xlabel("Predicted Label")
    plt.ylabel("True Label")
    plt.title(f"Confusion Matrix - {model_name} Detection")
    plt.tight_layout()

    # Saving files using the absolute OUTPUTS_DIR
    cm_path = os.path.join(OUTPUTS_DIR, f"{output_prefix}_confusion_matrix.png")
    plt.savefig(cm_path)
    plt.close()
    print(f"📁 Confusion matrix saved to: {cm_path}")

    metrics = {
        "model": model_name,
        "accuracy": round(accuracy, 2),
        "precision": round(precision, 2),
        "recall": round(recall, 2),
        "f1_score": round(f1, 2)
    }

    json_path = os.path.join(OUTPUTS_DIR, f"{output_prefix}_metrics.json")
    with open(json_path, "w") as f:
        json.dump(metrics, f, indent=4)

    print(f"📂 Metrics saved to: {json_path}")
    print(f"🎯 {model_name} evaluation complete!\n")


# -----------------------------
# Run evaluations
# -----------------------------
if __name__ == "__main__":
    print("🚀 Starting Model Evaluation for PhishAI...\n")

    # Defining paths using the absolute directory variables
    EMAIL_TEST_FEATURES = os.path.join(FEATURES_DIR, "emails_test_features.pkl")
    EMAIL_MODEL = os.path.join(MODELS_DIR, "email_rf_model.pkl")
    EMAIL_VECTORIZER = os.path.join(FEATURES_DIR, "tfidf_vectorizer.pkl")

    URL_TEST_FEATURES = os.path.join(FEATURES_DIR, "urls_test_features.pkl")
    URL_MODEL = os.path.join(MODELS_DIR, "url_rf_model.pkl")

    evaluate_model("EMAIL", EMAIL_TEST_FEATURES, EMAIL_MODEL, vectorizer_path=EMAIL_VECTORIZER, output_prefix="email")
    evaluate_model("URL", URL_TEST_FEATURES, URL_MODEL, vectorizer_path=None, output_prefix="url")

    print("✅ All models evaluated successfully!")
