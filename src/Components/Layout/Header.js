import React, { useContext, useState } from "react";
import logo from "../../Images/bird_crew_logo_black.png";
import "../../Styles/Layout/Header.css";
import { Link } from "react-router";
import { AuthContext } from "../../Context/Context";
import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;

function Header() {
  const { loggedIn, checkLoginState } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);

  const toggleMenu = () => {
    setMenu((state) => !state);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${serverUrl}/auth/logout`);

      checkLoginState();
      closeMenu();
      alert("Has cerrado sesión correctamente");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="header">
      <div className="header_leftside">
        <Link to="/">
          <img className="logo" src={logo} alt="Bird Crew Logo" />
        </Link>
        <div className="header_title">
          <Link to="/">
            <h1 className="title_lineOne">Bird Crew </h1>
            <span className="title_lineTwo"> Soluciones de marketing</span>
          </Link>
        </div>
      </div>

      <button
        className="hamburger_button"
        type="button"
        aria-label="Abrir menú de navegación"
        aria-expanded={menu}
        onClick={toggleMenu}
      >
        {menu ? "✕" : "☰"}
      </button>

      <nav className={`navbar ${menu ? "open" : ""}`}>
        <ul className="navbar_list">
          <li className="navbar_option">
            <Link to="/" onClick={closeMenu}>
              Inicio
            </Link>
          </li>
          <li className="navbar_option">
            <Link to="/Contacto" onClick={closeMenu}>
              Contacto
            </Link>
          </li>
          <li className="navbar_option">
            <Link to="/Blog" onClick={closeMenu}>
              Blog
            </Link>
          </li>
          {loggedIn ? (
            <li className="navbar_option">
              <button
                className="logout_button"
                type="button"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </li>
          ) : (
            <li className="navbar_option">
              <Link to="/Login" onClick={closeMenu}>
                Iniciar sesión
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
