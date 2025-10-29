import os

# ✅ Check environment variable first
HF_TOKEN = os.getenv("HF_TOKEN")

# ✅ Fallback: try local token file (for local testing)
if HF_TOKEN is None:
    TOKEN_PATH = os.path.join(os.path.dirname(__file__), "hf_token.txt")
    if os.path.exists(TOKEN_PATH):
        with open(TOKEN_PATH, "r") as f:
            HF_TOKEN = f.read().strip()
    else:
        print("⚠️ No Hugging Face token found (neither env nor file).")

# ✅ Example usage
from huggingface_hub import HfApi
api = HfApi(token=HF_TOKEN)
