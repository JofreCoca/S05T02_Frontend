import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { jwtDecode } from "jwt-decode";
import user from './uploaders/5user.jpg';
import dog from './uploaders/5dog.jpg';
import logoSimple from './logoSimple.png';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [email, setEmail] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null); // ← NUEVO estado para la imagen
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setEmail(decoded.user);
      setPhotoUrl(decoded.photo_url); // ← Obtener photo_url del token
      setIsAuthenticated(true);
    } else {
      setErrorMessage("No token found in localStorage");
      setTimeout(() => {}, 2000);
      navigate("/");
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
      <img src={logoSimple} alt="Perfil" className="profile-logoSimple" />
        <h1 className="welcome-text">Bienvenido, {email || profile?.ownerMail}</h1>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
        <div className="photo-container">
          <img src={user} alt="Perfil" className="profile-photo-user" />
        </div>
        <div className="photo-container">
          <img src={dog} alt="Perfil" className="profile-photo-dog" />
        </div>

      <div className="dashboard-container">
        {/* Aquí puedes mostrar el resto de la información del usuario */}
      </div>
    </div>
  );
};

export default Dashboard;






