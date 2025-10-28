from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from scripts.inference import predict

router = APIRouter()

class PredictRequest(BaseModel):
    input_data: str
    input_type: str = ["email", "url"]

class PredictResponse(BaseModel):
    status: str
    label: str
    confidence: float

@router.post("/", response_model=PredictResponse)
def predict_endpoint(payload: PredictRequest):
    try:
        input_data = payload.input_data
        input_type = payload.input_type

        if input_type not in ["email", "url"]:
            raise HTTPException(status_code=400, detail="Invalid input_type.")
        
        result = predict(input_data, input_type)

        return {
            "status": "success",
            "label": result['label'],
            "confidence": result['confidence']
        }
    
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="Model files not found.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
