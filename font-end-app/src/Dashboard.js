import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import {jwtDecode} from "jwt-decode";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const [email, setEmail] = useState(null)
  const [isAuthenticated    , setIsAuthenticated] = useState(false)
  const [errorMessage, setErrorMessage] = ("")



  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
        const decoded = jwtDecode(token)
        setEmail(decoded.user)
        setIsAuthenticated(true)


    } else {
      setErrorMessage("No token found in localStorage");
       setTimeout(() => {}, 2000);
      navigate("/"); // Redirigir al login si no hay token
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-wrapper">
    {errorMessage && <h1>{errorMessage}</h1>}
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      {isAuthenticated ? (
        <h1>Bienvenido, {email || profile?.ownerMail}</h1>
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





