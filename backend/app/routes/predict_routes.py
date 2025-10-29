from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from scripts.inference import predict

router = APIRouter()

class EmailRequest(BaseModel):
    email_text: str

class URLRequest(BaseModel):
    url: str

@router.post("/email")
async def predict_email(payload: EmailRequest):
    email_text= payload.email_text.strip()

    if not email_text:
        raise HTTPException(status_code=400, detail="Email text cannot be empty.")
    
    result = predict(email_text, input_type="email")
    return {
        "status": "success",
        "label": result['label'],
        "confidence": result['confidence']
    }

@router.post("/url")
async def predict_url(payload: URLRequest):
    url = payload.url.strip()

    if not url:
        raise HTTPException(status_code=400, detail="URL cannot be empty.")
    
    result = predict(url, input_type="url")
    return {
        "status": "success",
        "label": result['label'],
        "confidence": result['confidence']
    }

