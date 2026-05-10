import "../../Styles/Login/login.css";
import logo from "../../Images/bird_crew_logo_white.png";
import { login } from "../Services/authServices";

function Login() {
  const handleLogin = async () => {
    try {
      const res = await login();
      window.location.assign(res.url);
    } catch (err) {
      alert(err.message);
    }
  };
  const handleLog = async () => {
    const res = await fetch(`/tilin`, {
      method: "POST",
    });
    const data = await res.json();
    console.log(data);
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
        <button className="login-button" onClick={handleLog}>
          ELECRIZANTE
        </button>
      </div>
    </main>
  );
}

export default Login;
