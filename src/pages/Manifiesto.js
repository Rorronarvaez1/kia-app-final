import React from "react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { saveAs } from "file-saver";

const Manifiesto = () => {
  const handleCrearPDF = async () => {
    // Cargar PDF plantilla
    const existingPdfBytes = await fetch("/Formato Manifiesto.pdf")
      .then(res => res.arrayBuffer());

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPages()[0];
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // Función para imprimir texto en una posición específica
    const drawText = (text, x, y) => {
      page.drawText(text, {
        x,
        y,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
    };

    // Datos simulados de 5 residuos
    const datos = [
      ["Aceite usado", "200", "Tambor", "0.5", "kg"],
      ["Disolvente", "150", "Cont. plástico", "0.8", "kg"],
      ["Pintura vencida", "100", "Lata", "0.3", "kg"],
      ["Fango industrial", "250", "Tambor ", "1.2", "kg"],
      ["Líquido refrigerante", "180", "Bidón", "0.6", "kg"]
    ];

    // Coordenadas Y inicial (ajústalas a tu diseño real)
    let y = 950;
    datos.forEach((fila) => {
      drawText(fila[0], 95, y);  // Residuo
      drawText(fila[1], 427, y); // Capacidad
      drawText(fila[2], 505, y); // Contenedor
      drawText(fila[3], 580, y); // Cantidad
      drawText(fila[4], 660, y); // Unidad
      y -= 30; // siguiente fila
    });

    // Guardar y descargar
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "Manifiesto_KIA_Listo.pdf");
  };

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
        <button onClick={handleCrearPDF}>Crear Manifiesto (PDF)</button>
      </main>
    </div>
  );
};

export default Manifiesto;
