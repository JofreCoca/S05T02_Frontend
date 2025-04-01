import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "./Login.css";
import logo from "./logo.png";
import backgroundImage from "./background.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login exitoso:", data);
        localStorage.setItem("token", data.token);
        alert("Inicio de sesión exitoso");
      } else {
        console.error("Error en el login:", data.message);
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        position: "relative",
      }}
    >
      <div className="navbar">
        <img src={logo} alt="DoggoDate Logo" className="logo" />
      </div>

      <div className="overlay"></div>

      <div className="login-box">
        <h2 className="title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Correo electrónico:</label>
            <input
              type="email"
              className="input"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label className="label">Contraseña:</label>
            <input
              type="password"
              className="input"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button">Iniciar Sesión</button>
        </form>
        <p className="register-text">
          ¿No tienes cuenta?{" "}
          <span className="link" onClick={() => navigate("/register")}>
            Regístrate aquí
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;




