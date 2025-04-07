import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // Recuperar el nombre de usuario guardado en localStorage
  const storedUsername = localStorage.getItem("username");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Realiza la solicitud GET para obtener el perfil
      fetch("http://localhost:8080/auth/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Usa el token en el encabezado
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error del servidor: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setProfile(data); // Guarda los datos del perfil en el estado
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    } else {
      console.error("No token found in localStorage");
      navigate("/"); // Redirigir al login si no hay token
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-wrapper">
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      {profile ? (
        <h1>Bienvenido, {storedUsername || profile.ownerMail}</h1>
      ) : (
        <h1>Cargando perfil...</h1>
      )}

      <div className="dashboard-container">
        {/* Aquí puedes mostrar el resto de la información del usuario */}
      </div>
    </div>
  );
};

export default Dashboard;





