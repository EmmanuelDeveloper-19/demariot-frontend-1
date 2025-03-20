import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  AlertCircle,
  Droplet,
  ThermometerSun,
  Activity,
  MapPin,
} from "lucide-react";

// Simulated data generator
const generateData = () => {
  const now = new Date();
  const readings = [];

  // Generate 24 hours of readings
  for (let i = 0; i < 24; i++) {
    const time = new Date(now);
    time.setHours(now.getHours() - 24 + i);

    readings.push({
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mercury: Math.random() * 0.5 + 0.2,
      lead: Math.random() * 0.7 + 0.3,
      arsenic: Math.random() * 0.4 + 0.1,
      cadmium: Math.random() * 0.3 + 0.2,
      temperature: Math.random() * 5 + 20,
      ph: Math.random() * 2 + 6,
      turbidity: Math.random() * 20 + 5,
    });
  }

  return readings;
};

const IoTWaterMonitor = () => {
  const [data, setData] = useState([]);
  const [latestReading, setLatestReading] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState("mercury");
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Initialize with simulated data
    const initialData = generateData();
    setData(initialData);
    setLatestReading(initialData[initialData.length - 1]);

    // Check for alerts
    const newAlerts = [];
    const lastReading = initialData[initialData.length - 1];

    if (lastReading.mercury > 0.6)
      newAlerts.push("Mercury levels above safe threshold");
    if (lastReading.lead > 0.8)
      newAlerts.push("Lead levels above safe threshold");
    if (lastReading.arsenic > 0.4)
      newAlerts.push("Arsenic levels above safe threshold");
    if (lastReading.ph < 6.5 || lastReading.ph > 8.5)
      newAlerts.push("pH levels outside safe range");

    setAlerts(newAlerts);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newReading = {
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        mercury: Math.random() * 0.5 + 0.2,
        lead: Math.random() * 0.7 + 0.3,
        arsenic: Math.random() * 0.4 + 0.1,
        cadmium: Math.random() * 0.3 + 0.2,
        temperature: Math.random() * 5 + 20,
        ph: Math.random() * 2 + 6,
        turbidity: Math.random() * 20 + 5,
      };

      setData((prevData) => {
        const updatedData = [...prevData.slice(1), newReading];
        return updatedData;
      });

      setLatestReading(newReading);

      // Check for new alerts
      const updatedAlerts = [];
      if (newReading.mercury > 0.6)
        updatedAlerts.push("Mercury levels above safe threshold");
      if (newReading.lead > 0.8)
        updatedAlerts.push("Lead levels above safe threshold");
      if (newReading.arsenic > 0.4)
        updatedAlerts.push("Arsenic levels above safe threshold");
      if (newReading.ph < 6.5 || newReading.ph > 8.5)
        updatedAlerts.push("pH levels outside safe range");

      setAlerts(updatedAlerts);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Metrics for dropdown selection
  const metrics = [
    { value: "mercury", label: "Mercury (Hg)", unit: "mg/L", safeLevel: 0.6 },
    { value: "lead", label: "Lead (Pb)", unit: "mg/L", safeLevel: 0.8 },
    { value: "arsenic", label: "Arsenic (As)", unit: "mg/L", safeLevel: 0.4 },
    { value: "cadmium", label: "Cadmium (Cd)", unit: "mg/L", safeLevel: 0.3 },
    { value: "temperature", label: "Temperature", unit: "°C", safeLevel: null },
    { value: "ph", label: "pH", unit: "", safeLevel: null },
    { value: "turbidity", label: "Turbidity", unit: "NTU", safeLevel: null },
  ];

  const getCurrentMetric = () => {
    return metrics.find((m) => m.value === selectedMetric);
  };

  // Simulate the SVG map of Rio Blanco
  const RioBlanco = () => (
    <svg viewBox="0 0 800 400" className="w-full h-64 border rounded">
      {/* Background */}
      <rect width="800" height="400" fill="#f0f9ff" />

      {/* Land */}
      <path d="M0,0 L800,0 L800,400 L0,400 z" fill="#e0e0e0" />

      {/* River */}
      <path
        d="M100,50 C200,70 300,150 400,100 S600,200 700,150"
        stroke="#3b82f6"
        strokeWidth="30"
        fill="none"
      />

      {/* Sensor locations */}
      <circle cx="250" cy="110" r="10" fill="#ef4444" />
      <circle cx="450" cy="120" r="10" fill="#84cc16" />
      <circle cx="650" cy="150" r="10" fill="#84cc16" />

      {/* Cities/landmarks */}
      <circle cx="150" cy="70" r="5" fill="#1f2937" />
      <text x="160" y="75" fontSize="12" fill="#1f2937">
        Ciudad Norte
      </text>

      <circle cx="550" cy="200" r="5" fill="#1f2937" />
      <text x="560" y="205" fontSize="12" fill="#1f2937">
        Ciudad Sur
      </text>

      <circle cx="350" cy="150" r="5" fill="#1f2937" />
      <text x="360" y="155" fontSize="12" fill="#1f2937">
        Planta Industrial
      </text>

      {/* Legend */}
      <rect x="650" y="300" width="10" height="10" fill="#ef4444" />
      <text x="665" y="310" fontSize="12" fill="#1f2937">
        Sensor Activo (Alerta)
      </text>

      <rect x="650" y="320" width="10" height="10" fill="#84cc16" />
      <text x="665" y="330" fontSize="12" fill="#1f2937">
        Sensor Normal
      </text>
    </svg>
  );

  return (
    <div className="container">
      <h2>Datos recopilados</h2>
      <p className="text-gray-600">
        Datos en tiempo real del monitoreo de la calidad del agua
      </p>

      <div className="row">
        <div className="col-md-9">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Concentración de Metales pesados
                </h2>
                <select
                  value={selectedMetric}
                  onChange={(e) => setSelectedMetric(e.target.value)}
                  className="border rounded px-3 py-1 text-gray-700"
                >
                  {metrics.map((metric) => (
                    <option key={metric.value} value={metric.value}>
                      {metric.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={selectedMetric}
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                    {getCurrentMetric().safeLevel && (
                      <Line
                        type="monotone"
                        dataKey={() => getCurrentMetric().safeLevel}
                        stroke="#ef4444"
                        strokeDasharray="5 5"
                        name="Safe threshold"
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Zonas monitoreadas de Rio Blanco, Ver
              </h2>
              <RioBlanco />
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Lecturas actuales
            </h2>
            {latestReading && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <div className="flex items-center">
                    <Droplet className="text-blue-500 mr-2" size={20} />
                    <span>Mercurio (Hg)</span>
                  </div>
                  <span
                    className={`font-mono ${
                      latestReading.mercury > 0.6
                        ? "text-red-500 font-bold"
                        : ""
                    }`}
                  >
                    {latestReading.mercury.toFixed(3)} mg/L
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <div className="flex items-center">
                    <Droplet className="text-blue-500 mr-2" size={20} />
                    <span>Plomo (Pb)</span>
                  </div>
                  <span
                    className={`font-mono ${
                      latestReading.lead > 0.8 ? "text-red-500 font-bold" : ""
                    }`}
                  >
                    {latestReading.lead.toFixed(3)} mg/L
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <div className="flex items-center">
                    <Droplet className="text-blue-500 mr-2" size={20} />
                    <span>Arsénico (As)</span>
                  </div>
                  <span
                    className={`font-mono ${
                      latestReading.arsenic > 0.4
                        ? "text-red-500 font-bold"
                        : ""
                    }`}
                  >
                    {latestReading.arsenic.toFixed(3)} mg/L
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <div className="flex items-center">
                    <ThermometerSun
                      className="text-orange-500 mr-2"
                      size={20}
                    />
                    <span>Temperatura</span>
                  </div>
                  <span className="font-mono">
                    {latestReading.temperature.toFixed(1)} °C
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-blue-50 rounded">
                  <div className="flex items-center">
                    <Activity className="text-green-500 mr-2" size={20} />
                    <span>pH</span>
                  </div>
                  <span
                    className={`font-mono ${
                      latestReading.ph < 6.5 || latestReading.ph > 8.5
                        ? "text-red-500 font-bold"
                        : ""
                    }`}
                  >
                    {latestReading.ph.toFixed(1)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Alertas</h2>

            {alerts.length > 0 ? (
              <div className="space-y-3">
                {alerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start p-3 bg-red-50 border border-red-200 rounded"
                  >
                    <AlertCircle
                      className="text-red-500 mr-2 flex-shrink-0"
                      size={20}
                    />
                    <span className="text-red-700">{alert}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-green-50 border border-green-200 rounded">
                <span className="text-green-700">
                 Todos los parámetros dentro de rangos seguros
                </span>
              </div>
            )}

            <div className="mt-4">
              <div className="flex items-center">
                <MapPin className="text-gray-500 mr-2" size={16} />
                <span className="text-gray-600 text-sm">Sensor ID: RB-001</span>
              </div>
              <div className="flex items-center mt-1">
                <MapPin className="text-gray-500 mr-2" size={16} />
                <span className="text-gray-600 text-sm">
                  Location: Rio Blanco, Sector Norte
                </span>
              </div>
              <div className="flex items-center mt-1">
                <MapPin className="text-gray-500 mr-2" size={16} />
                <span className="text-gray-600 text-sm">
                  Last update: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IoTWaterMonitor;
