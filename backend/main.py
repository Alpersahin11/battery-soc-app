from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib
from tensorflow.keras.models import load_model
from fastapi import FastAPI
from schemas import BatteryInput
from utils import predict_soc


app = FastAPI(title="EV SOC Tahmin API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "EV SOC API çalışıyor!"}


@app.post("/predict")
def get_soc(input_data: BatteryInput):
    soc = predict_soc(input_data)
    return {"SOC": soc}
