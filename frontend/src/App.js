import { useState } from "react";
import axios from "axios";

function App() {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  const [formData, setFormData] = useState({
    voltage_measured: 3.5,
    temperature_measured: 32,
    voltage_load: 2.3,
    dq: 0.005,
    cycle_number: 80
  });

  const [soc, setSoc] = useState(null);

  const handleChange = (e) => {
    let value = parseFloat(e.target.value);
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/predict", {
        Voltage_measured: formData.voltage_measured,
        Temperature_measured: formData.temperature_measured,
        Voltage_load: formData.voltage_load,
        dQ: formData.dq,
        cycle_number: formData.cycle_number
      });
      setSoc(response.data.SOC?.toFixed(2) ?? null);
    } catch (err) {
      console.error(err);
      setSoc(null);
      alert("Tahmin alınamadı. Backend çalışıyor mu?");
    }
  };
  return (
    <div className="container my-5 p-4 shadow-sm rounded bg-white" style={{ maxWidth: "750px" }}>
      <h2 className="text-center text-primary mb-4">⚡ EV SOC Tahmini</h2>

      {/* Tahmin Formu */}
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-bold">VOLTAGE MEASURED (V):</label>
            <input step="any" className="form-control" type="number" name="voltage_measured" value={formData.voltage_measured} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">TEMPERATURE MEASURED (°C):</label>
            <input step="any" className="form-control" type="number" name="temperature_measured" value={formData.temperature_measured} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">VOLTAGE LOAD (V):</label>
            <input step="any" className="form-control" type="number" name="voltage_load" value={formData.voltage_load} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">dQ (Ah):</label>
            <input step="any" className="form-control" type="number" name="dq" value={formData.dq} onChange={handleChange} />
          </div>
          <div className="col-md-6">
            <label className="form-label fw-bold">Cycle Number:</label>
            <input step="any" className="form-control" type="number" name="cycle_number" value={formData.cycle_number} onChange={handleChange} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100 mt-4">Tahmin Et</button>
      </form>

      {soc && <div className="mt-4 alert alert-info text-center">Tahmini SOC: {soc} %</div>}

      {/* Değişkenler Hakkında Bilgi */}
      <div className="mt-5 p-3 bg-warning bg-opacity-10 border rounded">
        <h5 className="text-warning">Değişkenler Hakkında Bilgi</h5>
        <ul className="text-muted mt-2">
          <li><strong>Voltage_measured:</strong> Batarya terminal voltajı (V), SOC ile pozitif korelasyon.</li>
          <li><strong>Temperature_measured:</strong> Batarya sıcaklığı (°C), SOC azaldıkça artabilir.</li>
          <li><strong>Voltage_load:</strong> Yük altında ölçülen voltaj (V), bataryanın iç direncini ve SOC’yi etkiler.</li>
          <li><strong>dQ:</strong> Kapasite değişimi (Ah). Akım × süre entegrali ile hesaplanır, SOC ile negatif ilişkilidir.</li>
          <li><strong>cycle_number:</strong> Bataryanın geçirdiği şarj/deşarj döngüsü sayısı.</li>
        </ul>
      </div>
    </div>
  );
}

export default App;
