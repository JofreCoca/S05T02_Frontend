import React, { useEffect, useState } from "react";
import "./Notification.css";

function Notification({ message, type, onClose }) {
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000); // Cierra automáticamente después de 5 segundos

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      onClose(); // Elimina la notificación después de la animación
    }, 500); // Debe coincidir con la duración de la animación de salida
  };

  return (
    <div className={`notification ${type} ${closing ? "scale-out" : ""}`}>
      <button className="close-btn" onClick={handleClose}>
        &times;
      </button>
      <p>{message}</p>
    </div>
  );
}

export default Notification;


