import React, { useEffect, useState } from "react";
import "../App.css";

const Reporte = () => {
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [area, setArea] = useState("");
  const [articulo, setArticulo] = useState("");
  const [ordenCantidad, setOrdenCantidad] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const registrosPorPagina = 50;

  const resetearFiltros = () => {
    setFechaInicio("");
    setFechaFin("");
    setArea("");
    setArticulo("");
    setOrdenCantidad("");
    setPaginaActual(1);
  };

  useEffect(() => {
    const SHEET_API_URL = "https://api.sheetbest.com/sheets/a7d38c70-1c41-4bea-be48-dfa70da03d19";

    fetch(SHEET_API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setDatos(data);
        } else if (data.data && Array.isArray(data.data)) {
          setDatos(data.data);
        } else {
          setError("La respuesta no es una lista de datos.");
        }
      })
      .catch((err) => {
        console.error("Error al obtener datos:", err);
        setError("Error al obtener datos.");
      })
      .finally(() => setCargando(false));
  }, []);

  let datosFiltrados = datos.filter((fila) => {
    const fecha = new Date(fila["Fecha de ingreso"]);
    const inicio = fechaInicio ? new Date(fechaInicio) : null;
    const fin = fechaFin ? new Date(fechaFin) : null;

    return (
      (!inicio || fecha >= inicio) &&
      (!fin || fecha <= fin) &&
      (!area || fila["Area o proceso de generacion"] === area) &&
      (!articulo || fila["Art. 71 fracción I inciso (e)"] === articulo)
    );
  });

  if (ordenCantidad === "asc") {
    datosFiltrados.sort((a, b) => parseFloat(a["Cantidad generada Ton."]) - parseFloat(b["Cantidad generada Ton."]));
  } else if (ordenCantidad === "desc") {
    datosFiltrados.sort((a, b) => parseFloat(b["Cantidad generada Ton."]) - parseFloat(a["Cantidad generada Ton."]));
  }

  const totalPaginas = Math.ceil(datosFiltrados.length / registrosPorPagina);
  const inicio = (paginaActual - 1) * registrosPorPagina;
  const fin = inicio + registrosPorPagina;
  const datosPaginados = datosFiltrados.slice(inicio, fin);



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
        <h1>Reporte</h1>

        <button onClick={() => setMostrarFiltros(!mostrarFiltros)} style={{ marginBottom: "15px" }}>
          Personalizar búsqueda
        </button>

        {mostrarFiltros && (
          <div className="filtros" style={{ marginBottom: "20px", maxWidth: "900px", margin: "0 auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", alignItems: "center" }}>
              <label>
                Fecha de inicio:
                <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
              </label>

              <label>
                Fecha de fin:
                <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
              </label>

              <label>
                Área o proceso de generación:
                <select value={area} onChange={(e) => setArea(e.target.value)}>
                  <option value="">--</option>
                  <option value="Assembly">Assembly</option>
                  <option value="HO">HO</option>
                  <option value="Paint">Paint</option>
                  <option value="PTAR">PTAR</option>
                  <option value="Stamping">Stamping</option>
                  <option value="Utility">Utility</option>
                  <option value="Vendors">Vendors</option>
                  <option value="Welding">Welding</option>
                </select>
              </label>

              <label>
                Art. 71 fracción I inciso (e):
                <select value={articulo} onChange={(e) => setArticulo(e.target.value)}>
                  <option value="">--</option>
                  <option value="Confinamiento">Confinamiento</option>
                  <option value="Coprocesamiento">Coprocesamiento</option>
                  <option value="Reciclaje">Reciclaje</option>
                </select>
              </label>

              <label>
                Orden por cantidad:
                <select value={ordenCantidad} onChange={(e) => setOrdenCantidad(e.target.value)}>
                  <option value="">--</option>
                  <option value="asc">Ascendente</option>
                  <option value="desc">Descendente</option>
                </select>
              </label>
            </div>

            <div style={{ marginTop: "20px", textAlign: "center" }}>
              <button onClick={resetearFiltros}>Resetear filtros</button>
            </div>
          </div>
        )}

        {cargando && <p>Cargando datos...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!cargando && !error && (
          <>
            <div style={{ overflowX: "auto" }}>
              <table className="manifiesto-tabla" style={{ margin: "auto", backgroundColor: "white", minWidth: "1200px" }}>
                <thead>
                  <tr>
                    <th>Nombre del residuo</th>
                    <th>Tipo de contenedor</th>
                    <th>Cantidad generada (Ton)</th>
                    <th>Área o proceso de generación</th>
                    <th>Fecha de ingreso</th>
                    <th>Fecha de salida</th>
                    <th>Art. 71 fracción I inciso (e)</th>
                    <th>Nombre o razón social (Transportista)</th>
                    <th>No. autorización SEMARNAT</th>
                    <th>No. autorización SCT</th>
                    <th>Nombre o razón social (Destino)</th>
                    <th>No. autorización destino</th>
                    <th>Nombre Responsable Técnico</th>
                  </tr>
                </thead>
                <tbody>
                  {datosPaginados.map((fila, index) => (
                    <tr key={index}>
                      <td>{fila["Nombre del residuo"]}</td>
                      <td>{fila["Tipo de contenedor "]}</td>
                      <td>{fila["Cantidad generada Ton."]}</td>
                      <td>{fila["Area o proceso de generacion"]}</td>
                      <td>{fila["Fecha de ingreso"]}</td>
                      <td>{fila["Fecha de salida"]}</td>
                      <td>{fila["Art. 71 fracción I inciso (e)"]}</td>
                      <td>{fila["Nombre, denominación o razón social (Transportista)"]}</td>
                      <td>{fila["Número de autorización SEMARNAT"]}</td>
                      <td>{fila["Número de autorización SCT"]}</td>
                      <td>{fila["Nombre, denominación o razón social (Destino)"]}</td>
                      <td>{fila["No. autorización destino"]}</td>
                      <td>{fila["Nombre, Responsable Técnico"]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación tipo Google */}
            <div
  style={{
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "4px",
    flexWrap: "nowrap",
    whiteSpace: "nowrap"
  }}
>
  {/* Páginas 1–4 */}
  {[1, 2, 3, 4].map((num) =>
    num <= totalPaginas ? (
      <button
        key={num}
        onClick={() => setPaginaActual(num)}
        style={{
          width: "24px",
          height: "24px",
          fontSize: "12px",
          borderRadius: "4px",
          background: paginaActual === num ? "#1a73e8" : "transparent",
          color: paginaActual === num ? "#fff" : "#1a73e8",
          border: "none",
          fontWeight: paginaActual === num ? "bold" : "normal",
          cursor: "pointer",
          padding: "0"
        }}
      >
        {num}
      </button>
    ) : null
  )}

  {/* ... */}
  {totalPaginas > 5 && (
    <span style={{ fontSize: "12px", color: "#555" }}>...</span>
  )}

  {/* Última página */}
  {totalPaginas > 4 && (
    <button
      onClick={() => setPaginaActual(totalPaginas)}
      style={{
        width: "24px",
        height: "24px",
        fontSize: "12px",
        borderRadius: "4px",
        background: paginaActual === totalPaginas ? "#1a73e8" : "transparent",
        color: paginaActual === totalPaginas ? "#fff" : "#1a73e8",
        border: "none",
        fontWeight: paginaActual === totalPaginas ? "bold" : "normal",
        cursor: "pointer",
        padding: "0"
      }}
    >
      {totalPaginas}
    </button>
  )}

  {/* Siguiente */}
  {paginaActual < totalPaginas && (
    <button
      onClick={() => setPaginaActual(paginaActual + 1)}
      style={{
        width: "24px",
        height: "24px",
        fontSize: "12px",
        borderRadius: "4px",
        background: "transparent",
        color: "#1a73e8",
        border: "none",
        cursor: "pointer",
        padding: "0"
      }}
    >
      &gt;
    </button>
  )}
</div>


          </>
        )}
      </main>
    </div>
  );
};

export default Reporte;
