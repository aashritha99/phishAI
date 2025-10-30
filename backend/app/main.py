from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.predict_routes import router as predict_router

app = FastAPI(title="PishAI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173',
    "https://phishai.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(predict_router, prefix="/predict", tags=["Predict"])

@app.get("/")
def root():
    return {"Message ": "Welcome to the PishAI Backend! Use the /predict endpoint to classify emails and URLs."}