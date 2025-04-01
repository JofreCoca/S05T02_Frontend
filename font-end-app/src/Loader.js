import React from "react";
import logo from "./logo.png"; // Asegúrate de que la ruta es correcta
import "./Loader.css"; // Estilos para el loader

function Loader() {
  return (
    <div className="loading-screen">
      <img src={logo} alt="Cargando..." className="loading-logo" />
    </div>
  );
}

export default Loader;

