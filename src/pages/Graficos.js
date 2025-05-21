import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import "../App.css";

// 🎨 Colores para las gráficas
const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
  "#9241f5", "#E91E63", "#3F51B5", "#009688",
];

const Graficos = () => {
  // 📊 Estado de los datos y filtros
  const [datos, setDatos] = useState([]);
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [area, setArea] = useState("");

  // 📥 Cargar datos desde Sheet.best
  useEffect(() => {
    fetch("https://api.sheetbest.com/sheets/a7d38c70-1c41-4bea-be48-dfa70da03d19")
      .then((res) => res.json())
      .then((data) => setDatos(data))
      .catch((err) => console.error("Error al cargar datos:", err));
  }, []);

  // 🧹 Filtros
  const datosFiltrados = datos.filter((fila) => {
    const fecha = new Date(fila["Fecha de ingreso"]);
    const inicio = fechaInicio ? new Date(fechaInicio) : null;
    const fin = fechaFin ? new Date(fechaFin) : null;

    return (
      (!inicio || fecha >= inicio) &&
      (!fin || fecha <= fin) &&
      (!area || fila["Area o proceso de generacion"] === area)
    );
  });

  // 📊 Datos para PieChart (resumen por área)
  const resumenPorArea = {};
  datosFiltrados.forEach((fila) => {
    const area = fila["Area o proceso de generacion"];
    const cantidad = parseFloat(fila["Cantidad generada Ton."]) || 0;
    if (!resumenPorArea[area]) resumenPorArea[area] = 0;
    resumenPorArea[area] += cantidad;
  });

  const datosPieChart = Object.entries(resumenPorArea).map(([name, value]) => ({
    name,
    value,
  }));

  // 📈 Áreas únicas para LineChart
  const areasUnicas = [...new Set(datosFiltrados.map((d) => d["Area o proceso de generacion"]))];

  // 🔄 Transformar datos para LineChart agrupados por fecha y área
  const transformarParaLineChart = () => {
    const mapa = {};

    datosFiltrados.forEach((d) => {
      const rawFecha = d["Fecha de ingreso"];
      const fechaObj = new Date(rawFecha);

      // ✅ Validar que la fecha sea válida
      if (isNaN(fechaObj.getTime())) {
        console.warn("Fecha inválida encontrada:", rawFecha);
        return;
      }

      const fecha = fechaObj.toISOString().split("T")[0];
      const area = d["Area o proceso de generacion"];
      const cantidad = parseFloat(d["Cantidad generada Ton."]) || 0;

      if (!mapa[fecha]) mapa[fecha] = { fecha };
      if (!mapa[fecha][area]) mapa[fecha][area] = 0;

      mapa[fecha][area] += cantidad;
    });

    return Object.values(mapa).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
  };

  return (
    <div className="page-container">
      {/* 🔝 Navbar */}
      <header className="navbar">
        <div className="nav-left">
          <a href="/dashboard">Dashboard</a>
          <a href="/reporte">Reporte</a>
          <a href="/graficos">Gráficos</a>
          <a href="/ranking">Ranking</a>
          <a href="/manifiesto">Manifiesto</a>
        </div>
        <img src="/logo.png" alt="KIA logo" className="logo" />
      </header>

      <main className="content">
        {/* 🧠 Filtros */}
        <h1>Gráfico: Proporción de residuos por Área</h1>
        <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
          <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
          <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">Todas las áreas</option>
            <option value="Assembly">Assembly</option>
            <option value="HO">HO</option>
            <option value="Paint">Paint</option>
            <option value="PTAR">PTAR</option>
            <option value="Stamping">Stamping</option>
            <option value="Utility">Utility</option>
            <option value="Vendors">Vendors</option>
            <option value="Welding">Welding</option>
          </select>
        </div>

        {/* 🟠 PieChart + leyenda */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <ResponsiveContainer width={400} height={400}>
            <PieChart>
              <Pie
                data={datosPieChart}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                isAnimationActive={false}
              >
                {datosPieChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(2)} ton`} />
            </PieChart>
          </ResponsiveContainer>

          {/* 📋 Leyenda personalizada */}
          <div style={{ fontSize: "14px" }}>
            <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
              {datosPieChart.map((entry, index) => {
                const total = datosPieChart.reduce((sum, d) => sum + d.value, 0);
                const porcentaje = ((entry.value / total) * 100).toFixed(1);
                return (
                  <li key={index} style={{ marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span
                      style={{
                        width: 12,
                        height: 12,
                        display: "inline-block",
                        borderRadius: "50%",
                        backgroundColor: COLORS[index % COLORS.length],
                      }}
                    ></span>
                    <span>{`${entry.name}: ${entry.value.toFixed(2)} ton (${porcentaje}%)`}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* 📈 LineChart */}
        <h2 style={{ marginTop: "40px" }}>Tendencia de residuos por Área</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={transformarParaLineChart()}>
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Legend />
            {areasUnicas.map((area, index) => (
              <Line
                key={area}
                type="monotone"
                dataKey={area}
                stroke={COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={{ r: 1.5 }}
                activeDot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </main>
    </div>
  );
};

export default Graficos;
