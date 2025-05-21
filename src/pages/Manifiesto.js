import React from "react";
import "../App.css";

const Manifiesto = () => {
  return (
    <div className="page-container">
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
        <h1>Manifiesto de Residuos</h1>

        <table className="manifiesto-tabla">
          <tbody>
            <tr>
              <td colSpan="3"><strong>1. Num de Reg Ambiental</strong></td>
              <td colSpan="3">AAAAAAAAAA</td>
              <td colSpan="2"><strong>2. No de Manifiesto</strong></td>
              <td colSpan="2">AAA-34-234</td>
            </tr>
            <tr>
              <td colSpan="3"><strong>4. Razón Social de la empresa generadora</strong></td>
              <td colSpan="7">Empresa Mexico S.A de C.V.</td>
            </tr>
            <tr>
              <td colSpan="1"><strong>Domicilio:</strong></td>
              <td colSpan="2">Calle 123</td>
              <td><strong>C.P</strong></td>
              <td>2345432</td>
              <td><strong>Municipio/Delegación</strong></td>
              <td colSpan="2">AAAAAAA</td>
              <td><strong>Estado</strong></td>
              <td>Nuevo León</td>
            </tr>
            <tr>
              <td colSpan="2"><strong>Tel.</strong></td>
              <td colSpan="8">1234321 / 234543212</td>
            </tr>

            <tr>
              <th rowSpan="2" colSpan="4">5. Descripción (Nombre y CRETI)</th>
              <th colSpan="4">Contenedor</th>
              <th rowSpan="2">Cantidad Total</th>
              <th rowSpan="2" colSpan="1">Volumen Peso (KG)</th>
              
            </tr>
            <tr>
              
              <th colSpan="2">Capacidad</th>
              <th colSpan="2">Tipo</th>
            </tr>

            {/* filas vacías */}
            {[...Array(6)].map((_, i) => (
              <tr key={i}>
                <td colSpan="4"></td>
                <td colSpan="2"></td>
                <td colSpan="2"></td>
                <td colSpan="1"></td>
                <td colSpan="1"></td>
              </tr>
            ))}
          </tbody>
        </table>

      </main>
    </div>
  );
};

export default Manifiesto;
