import os
import sys
import joblib
import time
from tqdm import tqdm
from colorama import Fore, Style
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report

# =====================================================
# PATH SETUP
# =====================================================
# This gets /absolute/path/to/PishAI/backend/scripts
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# This gets /absolute/path/to/PishAI/backend
BACKEND_DIR = os.path.dirname(CURRENT_DIR)

# Go up one level to reach /absolute/path/to/PishAI
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)

FEATURES_DIR = os.path.join(PROJECT_ROOT, "dataset", "features")
MODELS_DIR = os.path.join(PROJECT_ROOT, "models")
os.makedirs(MODELS_DIR, exist_ok=True)

# =====================================================
# HELPER FUNCTION — PROGRESS BAR
# =====================================================
def progress_bar(task_name, total_steps=10, delay=0.2):
    print(f"\n🚀 {task_name}", flush=True)
    with tqdm(total=total_steps, desc=task_name, ncols=100, colour='cyan') as pbar:
        for _ in range(total_steps):
            time.sleep(delay)
            pbar.update(1)
        pbar.close()
    sys.stdout.flush()

# =====================================================
# HELPER FUNCTION — PRINT METRICS
# =====================================================
def print_metrics(y_true, y_pred, model_name, dataset_name):
    acc = round(accuracy_score(y_true, y_pred), 3)
    prec = round(precision_score(y_true, y_pred, average='weighted', zero_division=0), 3)
    rec = round(recall_score(y_true, y_pred, average='weighted', zero_division=0), 3)
    f1 = round(f1_score(y_true, y_pred, average='weighted', zero_division=0), 3)

    print(f"\n📊 {Fore.YELLOW}{model_name} ({dataset_name}) Metrics{Style.RESET_ALL}")
    print(f"Accuracy: {acc}, Precision: {prec}, Recall: {rec}, F1: {f1}\n", flush=True)

    report = classification_report(y_true, y_pred)
    report_file = os.path.join(MODELS_DIR, f"{dataset_name.lower()}_{model_name.lower()}_report.txt")
    with open(report_file, "w") as f:
        f.write(report)
    print(f"📝 Full report saved at: {report_file}\n", flush=True)

# =====================================================
# TRAIN EMAIL MODELS
# =====================================================
def train_email_models():
    print(f"\n{Fore.CYAN}📧 Training models for EMAIL detection...{Style.RESET_ALL}\n", flush=True)
    progress_bar("Loading Email Feature Data", total_steps=5, delay=0.2)

    email_train_path = os.path.join(FEATURES_DIR, "emails_train_features.pkl")
    email_test_path = os.path.join(FEATURES_DIR, "emails_test_features.pkl")

    if not os.path.exists(email_train_path) or not os.path.exists(email_test_path):
        print(f"{Fore.RED}❌ Email feature files not found. Run feature_engineering.py first.{Style.RESET_ALL}", flush=True)
        return

    X_train, y_train = joblib.load(email_train_path)
    X_test, y_test = joblib.load(email_test_path)

    # 🧠 Random Forest - ADDING class_weight='balanced'
    progress_bar("Training Random Forest (Email)", total_steps=15, delay=0.15)
    rf_email = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1, class_weight='balanced')
    rf_email.fit(X_train, y_train)
    y_pred_rf = rf_email.predict(X_test)
    joblib.dump(rf_email, os.path.join(MODELS_DIR, "email_rf_model.pkl"))
    print_metrics(y_test, y_pred_rf, "Random Forest", "Email")

    # 🧠 Logistic Regression - ADDING class_weight='balanced'
    progress_bar("Training Logistic Regression (Email)", total_steps=15, delay=0.15)
    lr_email = LogisticRegression(max_iter=1000, n_jobs=-1, class_weight='balanced')
    lr_email.fit(X_train, y_train)
    y_pred_lr = lr_email.predict(X_test)
    joblib.dump(lr_email, os.path.join(MODELS_DIR, "email_lr_model.pkl"))
    print_metrics(y_test, y_pred_lr, "Logistic Regression", "Email")

    print(f"{Fore.GREEN}✅ Email model training complete.\n{Style.RESET_ALL}", flush=True)

# =====================================================
# TRAIN URL MODELS
# =====================================================
def train_url_models():
    print(f"\n{Fore.MAGENTA}🌐 Training models for URL detection...{Style.RESET_ALL}\n", flush=True)
    progress_bar("Loading URL Feature Data", total_steps=5, delay=0.2)

    url_train_path = os.path.join(FEATURES_DIR, "urls_train_features.pkl")
    url_test_path = os.path.join(FEATURES_DIR, "urls_test_features.pkl")

    if not os.path.exists(url_train_path) or not os.path.exists(url_test_path):
        print(f"{Fore.YELLOW}⚠️ URL feature files not found. Skipping URL model training.{Style.RESET_ALL}", flush=True)
        return

    X_train, y_train = joblib.load(url_train_path)
    X_test, y_test = joblib.load(url_test_path)

    # 🧠 Random Forest - ADDING class_weight='balanced'
    progress_bar("Training Random Forest (URL)", total_steps=15, delay=0.15)
    rf_url = RandomForestClassifier(n_estimators=200, random_state=42, n_jobs=-1, class_weight='balanced')
    rf_url.fit(X_train, y_train)
    y_pred_rf = rf_url.predict(X_test)
    joblib.dump(rf_url, os.path.join(MODELS_DIR, "url_rf_model.pkl"))
    print_metrics(y_test, y_pred_rf, "Random Forest", "URL")

    # 🧠 Logistic Regression - ADDING class_weight='balanced'
    progress_bar("Training Logistic Regression (URL)", total_steps=15, delay=0.15)
    lr_url = LogisticRegression(max_iter=1000, n_jobs=-1, class_weight='balanced')
    lr_url.fit(X_train, y_train)
    y_pred_lr = lr_url.predict(X_test)
    joblib.dump(lr_url, os.path.join(MODELS_DIR, "url_lr_model.pkl"))
    print_metrics(y_test, y_pred_lr, "Logistic Regression", "URL")

    print(f"{Fore.GREEN}✅ URL model training complete.\n{Style.RESET_ALL}", flush=True)

# =====================================================
# MAIN
# =====================================================
if __name__ == "__main__":
    print(f"{Fore.CYAN}🧠 Starting Model Training Pipeline...\n{Style.RESET_ALL}", flush=True)
    train_email_models()
    train_url_models()
    print(f"{Fore.GREEN}🎯 All models trained and saved inside backend/models/\n{Style.RESET_ALL}", flush=True)
