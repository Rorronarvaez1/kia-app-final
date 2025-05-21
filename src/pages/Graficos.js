// pages/Graficos.js
import React from 'react';
import "../App.css";

export default function Graficos() {
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
        <h1>Gráficos</h1>
        <p>Ver grafos.</p>
      </main>
    </div>
  );
}