<!-- PROJECT LOGO -->
<p align="center">
  <img alt="PhishAI Logo" width="100" height="100" src="https://github.com/user-attachments/assets/43317f0d-657d-4c9b-8dcb-52be28f3b257" />
</p>

<h1 align="center">🧠 PhishAI – Intelligent Phishing Email Detection System</h1>

<p align="center">
  <b>AI-powered web app to detect phishing emails using Machine Learning</b><br/>
  <i>Built with React, FastAPI, and ML models (Logistic Regression & Random Forest)</i>
</p>

<p align="center">
  <a href="#"><img src="https://img.shields.io/badge/Made%20with-React-blue?logo=react&style=for-the-badge" /></a>
  <a href="#"><img src="https://img.shields.io/badge/Backend-Python%20%7C%20FastAPI-green?style=for-the-badge&logo=python" /></a>
  <a href="#"><img src="https://img.shields.io/badge/ML-Logistic%20Regression%20%7C%20Random%20Forest-orange?style=for-the-badge" /></a>
  <a href="#"><img src="https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge" /></a>
</p>

---

## 🧩 Overview

**PhishAI** is a smart phishing email detection system that leverages **Machine Learning** to analyze emails in real time and determine whether they are **Safe** or **Phishing**.  
It inspects the content, structure, and metadata of emails to identify potential threats, helping users stay secure from online scams and phishing attacks.

---

## 🚀 Features

- 🔍 Detects phishing emails using trained ML models  
- 📬 Analyzes sender, links, subject, and body content  
- ⚡ Real-time prediction with confidence scores  
- 🌐 Clean, responsive, and animated UI  
- 📊 Displays visual insights and detection stats  
- 🧠 Models trained on real phishing datasets  

---

## 🧠 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Frontend** | React.js, Tailwind CSS, Axios, Framer Motion |
| **Backend** | FastAPI / Flask, Python, scikit-learn, pandas, NumPy |
| **Machine Learning** | Logistic Regression, Random Forest, TF-IDF, CountVectorizer |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/amyy45/phishAI.git
cd phishai
```
### 2️⃣ Backend Setup
```
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
### 3️⃣ Frontend Setup
```
cd frontend
npm install
npm run dev
```
Now open 👉 http://localhost:5173 in your browser.

### 📚 Model Training
PhishAI’s ML models were trained on a labeled dataset of phishing and legitimate emails.
Features were extracted from email text, URLs, and headers using NLP and preprocessing pipelines.
Models are serialized as .pkl files and stored in the models/ directory for real-time inference.

### 📂 Project Structure
```
PHISHAI/
│
├── .env              
├── backend/                 # Backend (API + ML integration)
│
├── dataset/
│   └── features/            # Email datasets and extracted features
│
├── frontend/                # React frontend
│
├── models/                  # Trained ML models (.pkl)
│
├── outputs/                 # Evaluation results and logs
│
├── .dockerignore
├── .gitignore
├── Dockerfile
└── README.md
```

### 👩‍💻 Contributors
```
| Name          | Role                    | Contribution                                                    |
| ------------- | ----------------------- | --------------------------------------------------------------- |
|  Sneha        | Developer & ML Engineer | Built backend, trained ML models, integrated AI detection logic |
| Aashritha     | UI Developer            | Designed and developed the frontend user interface              |

```
### 📸 Screenshots

<img width="1452" height="855" alt="image" src="https://github.com/user-attachments/assets/95b100b5-9bca-4674-aeac-890e52a10740" />
<img width="1040" height="870" alt="image" src="https://github.com/user-attachments/assets/df55715b-e195-4ff3-a7da-ccc1d2c96221" />
<img width="1066" height="914" alt="image" src="https://github.com/user-attachments/assets/11d998ff-71c4-4414-bbaf-20a467bc5095" />


### 📜 License
This project is licensed under the MIT License.
Feel free to use and modify it for learning or research purposes.

### ⭐ Support
If you found PhishAI helpful or inspiring, please consider giving it a ⭐ on GitHub!
Together, let's spread awareness about phishing detection through AI 🤖💡



