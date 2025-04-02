import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthForm.css";
import logo from "./logo.png"; // Logo principal en la parte superior derecha
import logoSimple from "./logoSimple.png"; // Logo dentro de la ventana
import backgroundImage from "./background.png";
import Notification from './Notification'; // Importa el componente de notificación

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' o 'error'

  const navigate = useNavigate();

  const toggleView = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
      setEmail(""); // Limpiar campos al cambiar de vista
      setPassword("");
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? "http://localhost:8080/auth/login"
      : "http://localhost:8080/auth/register";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        data = null; // Si la respuesta no es JSON, evitamos el fallo
      }

      if (response.ok) {
        if (isLogin) {
          console.log("Login exitoso:", data);
          localStorage.setItem("token", data?.token || "");
          setMessage("Inicio de sesión exitoso");
          setMessageType("success");
          navigate("/dashboard"); // Redirige al dashboard o página de inicio
        } else {
          setMessage("Registro exitoso. Ahora puedes iniciar sesión.");
          setMessageType("success");
          setIsLogin(true); // Cambiar a vista de login después de registro exitoso
        }
      } else {
        if (data?.message) {
          setMessage(data.message);
          setMessageType("error");
        } else {
          setMessage("Ocurrió un problema inesperado.");
          setMessageType("error");
        }
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setMessage("Error al conectar con el servidor. Revisa la consola.");
      setMessageType("error");
    }
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      {/* Logo principal en la parte superior derecha */}
      <div className="navbar">
        <img src={logo} alt="DoggoDate Logo" className="logo" />
      </div>

      <div className="overlay"></div>

      {/* Contenedor de la ventana de login/register con el logo dentro */}
      <div
        key={isLogin ? "login" : "register"}
        className={`login-box ${isAnimating ? "scale-out" : "scale-in"}`}
      >
        {/* Logo Simple en la parte superior de la ventana */}
        <div className="logoSimple">
            <img src={logoSimple} alt="Logo Simple" className="logo-simple" />
        </div>
        <h2 className="title">{isLogin ? "Iniciar Sesión" : "Crear una cuenta"}</h2>
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
          <button type="submit" className="button">
            {isLogin ? "Empezar" : "Registrarse"}
          </button>
        </form>
        <p className="register-text">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <span className="link" onClick={toggleView}>
            {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
          </span>
        </p>
      </div>

      {/* Mostrar notificación si existe mensaje */}
      {message && (
        <Notification
          message={message}
          type={messageType}
          onClose={() => setMessage('')} // Cierra la notificación
        />
      )}
    </div>
  );
}

export default AuthPage;




