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

# ------------------------------------------------
# ✅ Common evaluation function
# ------------------------------------------------
def evaluate_model(model_name, test_features_path, model_path, vectorizer_path=None, output_prefix="model"):
    print(f"\n🔹 Evaluating {model_name} Model...")

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

    labels = sorted(list(set(y_test)))
    cm = confusion_matrix(y_test, y_pred, labels=labels)
    plt.figure(figsize=(6, 5))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
                xticklabels=labels, yticklabels=labels)
    plt.xlabel("Predicted Label")
    plt.ylabel("True Label")
    plt.title(f"Confusion Matrix - {model_name} Detection")
    plt.tight_layout()

    os.makedirs("outputs", exist_ok=True)
    cm_path = f"outputs/{output_prefix}_confusion_matrix.png"
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

    json_path = f"outputs/{output_prefix}_metrics.json"
    with open(json_path, "w") as f:
        json.dump(metrics, f, indent=4)

    print(f"📂 Metrics saved to: {json_path}")
    print(f"🎯 {model_name} evaluation complete!\n")


# -----------------------------
# Run evaluations
# -----------------------------
if __name__ == "__main__":
    print("🚀 Starting Model Evaluation for PhishAI...\n")

    EMAIL_TEST_FEATURES = "dataset/features/emails_test_features.pkl"
    EMAIL_MODEL = "models/email_rf_model.pkl"
    EMAIL_VECTORIZER = "dataset/features/tfidf_vectorizer.pkl"

    URL_TEST_FEATURES = "dataset/features/urls_test_features.pkl"
    URL_MODEL = "models/url_rf_model.pkl"

    evaluate_model("EMAIL", EMAIL_TEST_FEATURES, EMAIL_MODEL, vectorizer_path=EMAIL_VECTORIZER, output_prefix="email")
    evaluate_model("URL", URL_TEST_FEATURES, URL_MODEL, vectorizer_path=None, output_prefix="url")

    print("✅ All models evaluated successfully!")
