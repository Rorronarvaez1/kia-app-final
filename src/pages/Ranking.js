// pages/Ranking.js
import React, { useState } from 'react';
import "../App.css";


export default function Ranking() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDetails = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const areas = [
    'Assembly', 'Ho', 'Paint', 'PTAR', 'Stamping', 'Utility', 'Vendors', 'Welding'
  ];

  return (
    <div>
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
        <div className="ranking-box">
          <h2>Ranking por Área</h2>

          <div className="filters">
            <select id="mes">
              {['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'].map(mes => (
                <option key={mes} value={mes.toLowerCase()}>{mes}</option>
              ))}
            </select>

            <select id="año">
              {[2023, 2024, 2025].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="ranking-list">
            {areas.map((area, index) => (
              <div key={index}>
                <div
                  className={`ranking-item ${expandedIndex === index ? 'expanded' : ''}`}
                  onClick={() => toggleDetails(index)}
                >
                  {area} <span className="arrow">{expandedIndex === index ? '🔼' : '🔽'}</span>
                </div>
                {expandedIndex === index && (
                  <div className="details">Contenido adicional de {area}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
