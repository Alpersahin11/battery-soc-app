# ⚡ Batarya SOC Tahmin Uygulaması

Bu proje, elektrikli araçların (EV) bataryalarında **Şarj Durumunu (State of Charge - SOC)** tahmin etmek için geliştirilmiş uçtan uca bir makine öğrenimi uygulamasıdır.  
SOC tahmini, batarya yönetim sistemlerinde (BMS) kritik bir rol oynar ve bataryanın ömrünü uzatmak, güvenliği artırmak ve enerji kullanımını optimize etmek için büyük önem taşır.  

Bu uygulamada kullanılan **derin öğrenme modeli**, **NASA Ames Prognostics Center** tarafından yayımlanan [**NASA Battery Cycling Dataset**](https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/) üzerinde eğitilmiştir.  
Bu veri seti, farklı çevrimlerde test edilmiş lityum-iyon bataryalara ait akım, voltaj ve sıcaklık ölçümlerini içerir. Model, bu verileri kullanarak bataryanın gerçek zamanlı SOC değerini yüksek doğrulukla tahmin etmektedir.  

---

## 🔹 Uygulama Bileşenleri
 **Backend**: FastAPI tabanlı REST API  
  - Derin öğrenme modelini yükler ve gelen verilerle SOC tahmini yapar.  
  - Swagger tabanlı dokümantasyon sağlar.  

 **Frontend**: React tabanlı web arayüzü  
  - Kullanıcıların gerekli giriş verilerini sağlamasına ve tahmin sonuçlarını görselleştirmesine olanak tanır.  

 **Veri Kaynağı**:  
  - NASA Battery Dataset (Battery Cycling Test Data)  
  - Bataryaların farklı koşullar altında ölçülmüş akım, voltaj ve sıcaklık verileri  

 **Konteynerizasyon**:  
  - Backend ve frontend servisleri Docker ile paketlenmiştir.  
  - Docker Compose kullanılarak tek komutla tüm sistemi ayağa kaldırmak mümkündür.  


## 🚀 Teknolojiler
- **Backend**: FastAPI, TensorFlow/Keras, scikit-learn  
- **Frontend**: React, Vite  
- **Orchestration**: Docker & Docker Compose

---

## 🔧 Kurulum ve Çalıştırma

### 1. Gereksinimler
- [Docker](https://docs.docker.com/get-docker/)  
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Projeyi Klonlayın
```bash
git clone https://github.com/Alpersahin11/battery-soc-app
cd battery-soc-app
```
### 3. Servisleri Başlatın
```bash
docker compose up --build
```
### 4. Uygulamaya Erişim
Servisler çalıştıktan sonra aşağıdaki adreslerden uygulamaya ulaşabilirsiniz:

- **Frontend Uygulaması** 👉 [http://localhost:3000](http://localhost:3000)  
- **Backend API Dokümantasyonu (Swagger UI)** 👉 [http://localhost:8000/docs](http://localhost:8000/docs)

---
  
## 📡 API Servisi

Backend, **FastAPI** tabanlı bir servis olup, bataryanın Şarj Durumunu (SOC) tahmin etmek için bir REST API sunar.

---

### 🔹 Kullanılan Girdi Verileri

API’ye gönderilen her bir özellik, **NASA Battery Dataset** içindeki ölçümlerden alınmıştır:

- **Voltage_measured (float)** → Bataryanın anlık ölçülen voltaj değeri (V)  
- **Temperature_measured (float)** → Bataryanın anlık sıcaklık değeri (°C)  
- **Voltage_load (float)** → Yük altındaki batarya voltajı (V)  
- **dQ (float)** → Şarj/deşarj süresince kapasite değişimi (Ah)  
- **cycle_number (int)** → Bataryanın kaçıncı şarj/deşarj döngüsünde olduğu  

---

### 🔹 Tahmin Endpoint’i

**`POST /predict`**  
Bu endpoint, yukarıdaki sensör verilerini alır ve eğitilmiş derin öğrenme modelini kullanarak **SOC (State of Charge)** tahminini döndürür.

#### Örnek İstek
```json
{
  "Voltage_measured": 4.15,
  "Temperature_measured": 29.3,
  "Voltage_load": 3.98,
  "dQ": 0.005,
  "cycle_number": 120
}
```
#### Örnek Yanıt
```json
{
  "predicted_soc": 0.76
}
```

