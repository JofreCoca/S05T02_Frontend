import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "./logo.png"; // Logo principal en la parte superior derecha
import logoSimple from "./logoSimple.png"; // Logo dentro de la ventana
import backgroundImage from "./background.png";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const navigate = useNavigate();
  const toggleView = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setIsAnimating(false);
    }, 500);
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
        <img src={logoSimple} alt="Logo Simple" className="logo-simple" />

        <h2 className="title">{isLogin ? "Iniciar Sesión" : "Crear una cuenta"}</h2>
        <form>
          <div className="input-group">
            <label className="label">Correo electrónico:</label>
            <input type="email" className="input" placeholder="ejemplo@correo.com" required />
          </div>
          <div className="input-group">
            <label className="label">Contraseña:</label>
            <input type="password" className="input" placeholder="********" required />
          </div>
          <button type="submit" className="button">{isLogin ? "Empezar" : "Registrarse"}</button>
        </form>
        <p className="register-text">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
          <span className="link" onClick={toggleView}>
            {isLogin ? "Regístrate aquí" : "Inicia sesión aquí"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default AuthPage;


