// pages/Reporte.js

import React from "react";
import "../App.css";

const Reporte = () => {
  const datosReporte = [
    {
      tiempo: "2025-05-15 10:00",
      area: "PTAR",
      residuo: "Aceite usado",
      contenedor: "Tambor",
      cantidad: "0.5",
      transportista: "LogiTrans",
      empresa: "EcoSoluciones"
    },
    {
      tiempo: "2025-05-14 16:30",
      area: "Stamping",
      residuo: "Metal sobrante",
      contenedor: "Caja metálica",
      cantidad: "2.1",
      transportista: "Reciclametal",
      empresa: "Fundimetal SA"
    },
    // Agrega más registros aquí
  ];

  return (
    <div className="page-container">
      <header className="navbar">
        <div className="nav-left">
          <a href="/reporte">Reporte</a>
          <a href="/graficos">Gráficos</a>
          <a href="/ranking">Ranking</a>
          <a href="/manifiesto">Manifiesto</a>
        </div>
        <img src="/logo.png" alt="KIA logo" className="logo" />
      </header>

      <main className="content">
        <h1>Reporte</h1>
        <table className="reporte-tabla">
          <thead>
            <tr>
              <th>Tiempo</th>
              <th>Área de Generación</th>
              <th>Nombre de Residuo</th>
              <th>Tipo de Contenedor</th>
              <th>Cantidad Generada (ton)</th>
              <th>Transportista</th>
              <th>Empresa Receptora</th>
            </tr>
          </thead>
          <tbody>
            {datosReporte.map((fila, index) => (
              <tr key={index}>
                <td>{fila.tiempo}</td>
                <td>{fila.area}</td>
                <td>{fila.residuo}</td>
                <td>{fila.contenedor}</td>
                <td>{fila.cantidad}</td>
                <td>{fila.transportista}</td>
                <td>{fila.empresa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Reporte;
