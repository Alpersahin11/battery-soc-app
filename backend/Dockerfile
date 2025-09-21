FROM python:3.10-slim

WORKDIR /app

# Requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Uygulama dosyaları
COPY . .

# Model klasörünü kopyala
COPY model/ model/

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
