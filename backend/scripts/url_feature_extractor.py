import pandas as pd
import numpy as np
import joblib
import urllib.parse, re, tldextract, socket
import os

SENSITIVE_WORDS = ['secure', 'account', 'login', 'update', 'verify', 'banking', 'confirm', 'password']
BRAND_NAMES = ['google', 'facebook', 'paypal', 'apple', 'amazon', 'icici', 'bank']

CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.dirname(CURRENT_DIR)
PROJECT_ROOT = os.path.dirname(BACKEND_DIR)
FEATURES_DIR = os.path.join(PROJECT_ROOT, "dataset", "features")

# Path to your saved feature column names
FEATURE_COLS_PATH = os.path.join(FEATURES_DIR, "url_feature_columns.pkl")

def extract_url_features(url: str):
    """Extract URL features dynamically aligned with training columns."""
    # Base feature generation (same logic as before)
    features = {}
    parsed = urllib.parse.urlparse(url)
    hostname = parsed.hostname or ""
    path = parsed.path or ""
    query = parsed.query or ""

    features['NumDots'] = url.count('.')
    features['SubdomainLevel'] = hostname.count('.') - 1 if '.' in hostname else 0
    features['PathLevel'] = path.count('/')
    features['UrlLength'] = len(url)
    features['NumDash'] = url.count('-')
    features['NumDashInHostname'] = hostname.count('-')
    features['AtSymbol'] = int('@' in url)
    features['TildeSymbol'] = int('~' in url)
    features['NumUnderscore'] = url.count('_')
    features['NumPercent'] = url.count('%')
    features['NumQueryComponents'] = len(query.split('&')) if query else 0
    features['NumAmpersand'] = url.count('&')
    features['NumHash'] = url.count('#')
    features['NumNumericChars'] = sum(c.isdigit() for c in url)
    features['NoHttps'] = int(not url.lower().startswith('https'))
    features['RandomString'] = int(re.search(r'[A-Za-z0-9]{10,}', url) is not None)
    features['IpAddress'] = int(bool(re.match(r'\d+\.\d+\.\d+\.\d+', hostname)))

    ext = tldextract.extract(url)
    domain = ext.domain or ""
    features['DomainInSubdomains'] = int(domain in ext.subdomain)
    features['DomainInPaths'] = int(domain in path)
    features['HttpsInHostname'] = int('https' in hostname)
    features['HostnameLength'] = len(hostname)
    features['PathLength'] = len(path)
    features['QueryLength'] = len(query)
    features['DoubleSlashInPath'] = int('//' in path)
    features['NumSensitiveWords'] = sum(word in url.lower() for word in SENSITIVE_WORDS)
    features['EmbeddedBrandName'] = sum(b in url.lower() for b in BRAND_NAMES)

    # Load training feature list
    train_cols = joblib.load(FEATURE_COLS_PATH)

    # Fill remaining columns dynamically
    df = pd.DataFrame([features])
    for col in train_cols:
        if col not in df.columns:
            df[col] = 0.0

    # Reorder to match training
    df = df[train_cols]
    return df
