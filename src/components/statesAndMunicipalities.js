import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { BarChart, Bar } from "recharts";

// Simulador de datos IoT
const fetchDataFromIoT = () => {
  // Simula los datos de los sensores
  return {
    turbidity: Math.random() * 5, // Simula la turbidez
    temperature: 25 + Math.random(), // Simula la temperatura
    pH: 7 + Math.random() * 0.5, // Simula el pH
    metals: [
      { name: 'Plomo', value: Math.random() * 100 },
      { name: 'Mercurio', value: Math.random() * 100 },
      { name: 'Cadmio', value: Math.random() * 100 }
    ]
  };
};

// Colores personalizados para gráficos
const COLORS = {
  turbidity: "#FF6B6B",
  temperature: "#4ECDC4",
  pH: "#9D65C9",
  lead: "#FF6B6B",
  mercury: "#4ECDC4",
  cadmium: "#9D65C9",
  background: "#292F36",
  cardBg: "#1D2025",
  text: "#F7FFF7"
};

const Home = () => {
  const [data, setData] = useState({
    dataLine: [],
    dataPie: [],
    dataBar: [
      { month: "Enero", lead: 5, mercury: 2, cadmium: 3 },
      { month: "Febrero", lead: 6, mercury: 2.5, cadmium: 3.5 },
      { month: "Marzo", lead: 4, mercury: 2, cadmium: 2.5 },
      { month: "Abril", lead: 7, mercury: 3, cadmium: 4 },
      { month: "Mayo", lead: 6.5, mercury: 2.8, cadmium: 3.2 },
      { month: "Junio", lead: 5.2, mercury: 2.3, cadmium: 3.7 }
    ]
  });

  useEffect(() => {
    // Cargar datos iniciales
    setData(prevData => ({
      ...prevData,
      dataPie: fetchDataFromIoT().metals,
      dataLine: [{ time: new Date().toLocaleTimeString(), ...fetchDataFromIoT() }]
    }));

    // Actualiza los datos cada 5 segundos (simulación)
    const interval = setInterval(() => {
      const newData = fetchDataFromIoT();
      setData(prevData => ({
        dataLine: [
          ...prevData.dataLine.slice(-10), // Mantiene sólo los últimos 10 puntos
          { time: new Date().toLocaleTimeString(), turbidity: newData.turbidity, temperature: newData.temperature, pH: newData.pH }
        ],
        dataPie: newData.metals,
        dataBar: prevData.dataBar
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: COLORS.background, color: COLORS.text }}>
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Panel de Control de Calidad del Agua</h1>
        <p className="text-gray-300">Monitoreo en tiempo real y predicciones de parámetros hídricos</p>
      </header>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de Línea: Últimos datos registrados */}
        <div className="rounded-lg shadow-lg p-6" style={{ backgroundColor: COLORS.cardBg }}>
          <h2 className="text-xl font-semibold mb-4">Monitoreo en Tiempo Real</h2>
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-4">
              <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: COLORS.turbidity }}>Turbidez</span>
              <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: COLORS.temperature }}>Temperatura</span>
              <span className="px-3 py-1 rounded-full text-sm" style={{ backgroundColor: COLORS.pH }}>pH</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.dataLine}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" tick={{ fill: COLORS.text }} />
              <YAxis tick={{ fill: COLORS.text }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(29,32,37,0.95)', color: COLORS.text, borderRadius: '8px', border: 'none' }} />
              <Legend iconType="circle" />
              <Line type="monotone" dataKey="turbidity" stroke={COLORS.turbidity} strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="temperature" stroke={COLORS.temperature} strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="pH" stroke={COLORS.pH} strokeWidth={2} dot={false} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Pastel: Metales en tiempo real */}
        <div className="rounded-lg shadow-lg p-6" style={{ backgroundColor: COLORS.cardBg }}>
          <h2 className="text-xl font-semibold mb-4">Concentración de Metales</h2>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.dataPie}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value.toFixed(1)}`}
                >
                  {data.dataPie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % 3]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toFixed(2)} contentStyle={{ backgroundColor: 'rgba(29,32,37,0.95)', color: COLORS.text, borderRadius: '8px', border: 'none' }} />
                <Legend iconType="circle" layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Gráfico de Barras: Predicción */}
      <div className="mt-6 rounded-lg shadow-lg p-6" style={{ backgroundColor: COLORS.cardBg }}>
        <h2 className="text-xl font-semibold mb-4">Predicción de Contaminantes</h2>
        <p className="text-gray-300 mb-4">Tendencia de concentración de metales pesados en los próximos meses</p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data.dataBar}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" tick={{ fill: COLORS.text }} />
            <YAxis tick={{ fill: COLORS.text }} />
            <Tooltip contentStyle={{ backgroundColor: 'rgba(29,32,37,0.95)', color: COLORS.text, borderRadius: '8px', border: 'none' }} />
            <Legend iconType="circle" />
            <Bar dataKey="lead" name="Plomo" fill={COLORS.lead} radius={[4, 4, 0, 0]} />
            <Bar dataKey="mercury" name="Mercurio" fill={COLORS.mercury} radius={[4, 4, 0, 0]} />
            <Bar dataKey="cadmium" name="Cadmio" fill={COLORS.cadmium} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      {/* Resumen de Indicadores */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.dataLine.length > 0 && (
          <>
            <div className="rounded-lg shadow-lg p-4 text-center" style={{ backgroundColor: COLORS.cardBg }}>
              <h3 className="text-lg font-medium mb-2">Turbidez</h3>
              <p className="text-3xl font-bold" style={{ color: COLORS.turbidity }}>
                {data.dataLine[data.dataLine.length - 1].turbidity.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400 mt-1">NTU</p>
            </div>
            
            <div className="rounded-lg shadow-lg p-4 text-center" style={{ backgroundColor: COLORS.cardBg }}>
              <h3 className="text-lg font-medium mb-2">Temperatura</h3>
              <p className="text-3xl font-bold" style={{ color: COLORS.temperature }}>
                {data.dataLine[data.dataLine.length - 1].temperature.toFixed(1)}
              </p>
              <p className="text-sm text-gray-400 mt-1">°C</p>
            </div>
            
            <div className="rounded-lg shadow-lg p-4 text-center" style={{ backgroundColor: COLORS.cardBg }}>
              <h3 className="text-lg font-medium mb-2">pH</h3>
              <p className="text-3xl font-bold" style={{ color: COLORS.pH }}>
                {data.dataLine[data.dataLine.length - 1].pH.toFixed(1)}
              </p>
              <p className="text-sm text-gray-400 mt-1">Unidades</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;