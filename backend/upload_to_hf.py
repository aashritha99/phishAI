from huggingface_hub import HfApi
import os

# --- CONFIG ---
REPO_ID = "amy45/model"  

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(CURRENT_DIR)

LOCAL_FILES = {
    os.path.join(PROJECT_ROOT, "models", "email_rf_model.pkl"): "email_rf_model.pkl",
    os.path.join(PROJECT_ROOT, "models", "email_lr_model.pkl"): "email_lr_model.pkl",
    os.path.join(PROJECT_ROOT, "models", "url_lr_model.pkl"): "url_lr_model.pkl",
    os.path.join(PROJECT_ROOT, "models", "url_rf_model.pkl"): "url_rf_model.pkl",
    os.path.join(PROJECT_ROOT, "dataset", "features", "tfidf_vectorizer.pkl"): "tfidf_vectorizer.pkl",
    os.path.join(PROJECT_ROOT, "dataset", "features", "url_feature_columns.pkl"): "url_feature_columns.pkl",
    os.path.join(PROJECT_ROOT, "dataset", "features", "url_scaler.pkl"): "url_scaler.pkl",
}
# ----------------

api = HfApi()

# ✅ Create the repo (if doesn’t exist)
try:
    api.create_repo(repo_id=REPO_ID, repo_type="model", private=False)
    print(f"✅ Created repo: {REPO_ID}")
except Exception as e:
    print(f"⚠️ Repo may already exist: {e}")

# ✅ Upload all files
for local_path, repo_path in LOCAL_FILES.items():
    if not os.path.exists(local_path):
        print(f"❌ File not found: {local_path}")
        continue
    print(f"⬆️ Uploading {repo_path} ...")
    api.upload_file(
        path_or_fileobj=local_path,
        path_in_repo=repo_path,
        repo_id=REPO_ID,
        repo_type="model",
        commit_message=f"Add {repo_path}",
    )
    print(f"✅ Uploaded: {repo_path}")

print(f"\n🎉 Done! Check your models here → https://huggingface.co/{REPO_ID}")
