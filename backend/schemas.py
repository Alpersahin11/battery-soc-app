from pydantic import BaseModel

class BatteryInput(BaseModel):
    Voltage_measured: float
    Temperature_measured: float
    Voltage_load: float
    dQ: float
    cycle_number: int
