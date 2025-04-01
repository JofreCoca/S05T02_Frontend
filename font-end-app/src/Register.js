         import React, { useState } from "react";
         import { useNavigate } from "react-router-dom";
         import "./Login.css"; // Puedes usar los mismos estilos de Login.css
         import logo from "./logo.png";
         import backgroundImage from "./background.png";

         function Register() {
           const [email, setEmail] = useState("");
           const [password, setPassword] = useState("");
           const navigate = useNavigate();

           const handleRegister = async (e) => {
             e.preventDefault();

             try {
               const response = await fetch("http://localhost:8080/auth/register", {
                 method: "POST",
                 headers: {
                   "Content-Type": "application/json",
                 },
                 body: JSON.stringify({ email, password }),
               });

               if (response.ok) {
                 alert("Registro exitoso. Ahora puedes iniciar sesión.");
                 navigate("/login"); // Redirige al login
               } else {
                 const errorData = await response.json();
                 alert(`Error: ${errorData.message}`);
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
                 <h2 className="title">Registrarse</h2>
                 <form onSubmit={handleRegister}>
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
                   <button type="submit" className="button">Registrarse</button>
                 </form>
                 <p className="register-text">
                   ¿Ya tienes cuenta?{" "}
                   <span className="link" onClick={() => navigate("/login")}>
                     Inicia sesión aquí
                   </span>
                 </p>
               </div>
             </div>
           );
         }

         export default Register;
