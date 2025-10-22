from fastapi import FastAPI
from app.routes import root_routes, predict_routes

app = FastAPI(title="PishAI Backend")


# ✅ Include routes
app.include_router(root_routes.router)
app.include_router(predict_routes.router)

@app.on_event("startup")
async def startup_event():
    print("🚀 PishAI API running successfully!")

