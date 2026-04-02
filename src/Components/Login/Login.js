import React from "react";
import "../../Styles/Login/login.css";
import logo from "../../Images/bird_crew_logo_black.png";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;
function Login() {
  const handleLogin = async () => {
    try {
      const {
        data: { url },
      } = await axios.get(`${serverUrl}/auth/url`);
      window.location.assign(url);
    } catch (err) {
      console.error(err);
      alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <main className="login">
      <div className="loginContainer">
        <h1 className="login-header">Iniciar sesión</h1>
        <img className="logo_login" src={logo} alt="Bird_crew_logo" />
        <p className="login_info">
          Inicia sesión para poder suscribirte a nuestra página y recibir
          notificaciones
        </p>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </main>
  );
}

export default Login;
