import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Dashboard.css";
import logoSimple from './logoSimple.png';
import user from './user.png';

const Dashboard = () => {
  const [email, setEmail] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token leído:", token); // Debug: Verifica que el token exista

    if (!token) {
      setErrorMessage("No token found in localStorage");
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setEmail(decoded.email || decoded.sub); // Asegura fallback con .sub
      setPhotoUrl(decoded.photo_url || null);
      fetchDogs(token);
    } catch (err) {
      console.error("Token inválido o corrupto:", err);
      setErrorMessage("Token inválido");
      navigate("/");
    }
  }, [navigate]);

  const fetchDogs = async (token) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/dog/getAll', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const dogsData = await response.json();
        setDogs(dogsData);
      } else {
        console.error("Error al obtener perros:", await response.text());
        setErrorMessage("Error al obtener perros");
      }
    } catch (error) {
      console.error("Excepción en fetchDogs:", error);
      setErrorMessage("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

const handleDeleteDog = async (dogId, userId) => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch('http://localhost:8080/dog/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        iddogs: dogId,
        users_idusers: userId,
      }),
    });

    if (response.ok) {
      console.log("Perro eliminado correctamente");
      setDogs(dogs.filter(dog => dog.iddogs !== dogId));
    } else {
      console.error("Error al eliminar el perro:", await response.text());
      setErrorMessage("Error al eliminar el perro");
    }
  } catch (error) {
    console.error("Excepción al eliminar el perro:", error);
    setErrorMessage("Error al conectar con el servidor para eliminar");
  }
};





  return (
    <div className="dashboard-wrapper">
      <div className="logout-container">
        <img src={logoSimple} alt="Logo" className="profile-logoSimple" />
        <h1 className="welcome-text">Bienvenido, {email}</h1>
        <button className="logout-button" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>

      <div className="photo-container-user">
        <img src={user} alt="Usuario" className="profile-photo-user" />
      </div>

      <div className="dogs-list">
        {loading ? (
          <p>Cargando perros...</p>
        ) : dogs.length > 0 ? (
          <div className="dogs-container">
{dogs.map((dog) => (
  <div className="dogs-card" key={dog.iddogs}>
    {dog.photo_url && <img src={dog.photo_url} className="dog-photo" />}
    <h4>{dog.name}</h4>
    <p>{dog.breed}</p>
    <p>{dog.age} años</p>
    <p>{dog.gender}</p>

    <button
      type="button"
      className="delete-button"
      onClick={() => handleDeleteDog(dog.iddogs, dog.users_idusers)}
    >
      Eliminar
    </button>
  </div>
))}

          </div>
        ) : (
          <p>No hay perros registrados.</p>
        )}
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Dashboard;









