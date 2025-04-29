import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Dashboard.css";
import logoSimple from './logoSimple.png';
import user from './user.png';

import BorderCollie from './uploaders/BorderCollie.png';
import Chihuahua from './uploaders/Chihuahua.jpg';
import GoldenRetriever from './uploaders/GoldenRetriever.png';

const Dashboard = () => {
  const navigate = useNavigate();
  const [editingDog, setEditingDog] = useState(null);
  const [email, setEmail] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newDog, setNewDog] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    photo_url: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token found in localStorage");
      navigate("/AuthForm");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setEmail(decoded.email || decoded.sub);
      setPhotoUrl(decoded.photo_url || null);
      fetchDogs(token);
    } catch (err) {
      console.error("Token inválido o corrupto:", err);
      setErrorMessage("Token inválido");
      navigate("/AuthForm");
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
      const response = await fetch(`http://localhost:8080/dog/delete/${dogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.ok) {
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

  const handleCreateDog = async () => {
    const token = localStorage.getItem("token");

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.idusers || decoded.userId;

      const response = await fetch('http://localhost:8080/dog/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...newDog,
          users_idusers: userId,
        }),
      });

      if (response.ok) {
        setNewDog({
          name: "",
          breed: "",
          age: "",
          gender: "",
          photo_url: "",
        });
        setEditingDog(null);
        fetchDogs(token);
      } else {
        console.error("Error al crear el perro:", await response.text());
        setErrorMessage("Error al crear el perro");
      }
    } catch (error) {
      console.error("Excepción al crear el perro:", error);
      setErrorMessage("Error al conectar con el servidor para crear");
    }
  };

  const handleNewDogChange = (e) => {
    const { name, value } = e.target;
    setNewDog(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

const handleUpdateDog = async () => {
  const token = localStorage.getItem("token");

  if (!editingDog || !editingDog.iddogs) {
    console.error("No se ha seleccionado un perro para editar.");
    setErrorMessage("No se ha seleccionado un perro para editar.");
    return;
  }

  try {
    const decoded = jwtDecode(token);
    const userId = decoded.idusers || decoded.userId;

    const updatedDog = {
      ...newDog,
      iddogs: editingDog.iddogs, // <-- Clave: incluir el ID del perro que se está editando
      users_idusers: userId,
    };

    const response = await fetch(`http://localhost:8080/dog/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedDog),
    });

    if (response.ok) {
      console.log("Perro actualizado correctamente");
      setNewDog({
        name: "",
        breed: "",
        age: "",
        gender: "",
        photo_url: "",
      });
      setEditingDog(null);
      fetchDogs(token);
    } else {
      console.error("Error al actualizar el perro:", await response.text());
      setErrorMessage("Error al actualizar el perro");
    }
  } catch (error) {
    console.error("Excepción al actualizar el perro:", error);
    setErrorMessage("Error al conectar con el servidor para actualizar");
  }
};



  const getBreedImage = (breed) => {
    switch (breed.toLowerCase()) {
      case 'border collie':
        return BorderCollie;
      case 'chihuahua':
        return Chihuahua;
      case 'golden retriever':
        return GoldenRetriever;
      default:
        return null;
    }
  };

  const handleEditDog = (dog) => {
    setNewDog({
      name: dog.name,
      breed: dog.breed,
      age: dog.age,
      gender: dog.gender,
      photo_url: dog.photo_url,
    });
    setEditingDog(dog);
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
        ) : (
          <div className="dogs-container">
            {/* Carta para crear o editar */}
            <div className="dogs-card new-dog-card">
              <h4>{editingDog ? "Editar Mascota" : "Nueva Mascota"}</h4>
              <input
                type="text"
                name="name"
                placeholder="Nombre"
                value={newDog.name}
                onChange={handleNewDogChange}
              />
              <select
                name="breed"
                value={newDog.breed}
                onChange={handleNewDogChange}
              >
                <option value="">Selecciona Raza</option>
                <option value="Border collie">Border collie</option>
                <option value="Chihuahua">Chihuahua</option>
                <option value="Golden retriever">Golden retriever</option>
              </select>
              <input
                type="text"
                name="age"
                placeholder="Edad"
                value={newDog.age}
                onChange={handleNewDogChange}
              />
              <select
                name="gender"
                value={newDog.gender}
                onChange={handleNewDogChange}
              >
                <option value="">Selecciona Género</option>
                <option value="FEMALE">Hembra</option>
                <option value="MALE">Macho</option>
                <option value="OTHER">Otro</option>
              </select>


{editingDog ? (
  <div style={{ display: 'flex', gap: '10px' }}>
    <button
      onClick={handleUpdateDog}
      className="create-button"
    >
      Actualizar
    </button>
    <button
      onClick={() => {
        setEditingDog(null);
        setNewDog({
          name: "",
          breed: "",
          age: "",
          gender: "",
          photo_url: "",
        });
      }}
      className="cancel-button"
    >
      Cancelar
    </button>
  </div>
) : (
  <button
    onClick={handleCreateDog}
    className="create-button"
  >
    Crear
  </button>
)}



            </div>

            {/* Cartas de los perros existentes */}
            {dogs.map((dog) => (
              <div className="dogs-card" key={dog.iddogs}>
                <img
                  src={getBreedImage(dog.breed)}
                  alt={dog.name}
                  className="dog-photo"
                />
                <h4>{dog.name}</h4>
                <p>{dog.breed}</p>
                <p>{dog.age} años</p>
                <p>{dog.gender}</p>
                <div className="card-buttons">
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleEditDog(dog)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDeleteDog(dog.iddogs, dog.users_idusers)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Dashboard;











