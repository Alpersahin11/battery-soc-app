import numpy as np
import joblib
from tensorflow.keras.models import load_model
from schemas import BatteryInput
import pandas as pd

# Önceden kaydedilmiş scaler ve model yükleniyor
scaler_X = joblib.load("model/scaler_X.save")
scaler_y = joblib.load("model/scaler_y.save")
model = load_model("model/soc_dense_model_final.keras")

def preprocess_input(data: BatteryInput):
    # Feature isimlerini koruyarak DataFrame oluştur
    input_dict = {
        "Voltage_measured": [data.Voltage_measured],
        "Temperature_measured": [data.Temperature_measured],
        "Voltage_load": [data.Voltage_load],
        "dQ": [data.dQ],
        "cycle_number": [data.cycle_number]
    }
    input_df = pd.DataFrame(input_dict)
    
    # Scaler ile transform et
    X_scaled = scaler_X.transform(input_df)
    return X_scaled

def predict_soc(data: BatteryInput):
    X_scaled = preprocess_input(data)
    y_pred_scaled = model.predict(X_scaled, verbose=0)
    y_pred = scaler_y.inverse_transform(y_pred_scaled)
    y_pred = np.clip(y_pred, 0, 1)  # SOC 0-1 aralığında
    return float(y_pred[0][0])
