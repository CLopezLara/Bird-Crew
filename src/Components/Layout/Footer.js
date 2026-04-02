import React from "react";
import "../../Styles/Layout/Footer.css";
import bird_crew_logo from "../../Images/bird_crew_logo_black.png";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="subscribe">
        <Link to="/">
          <img
            className="subscribe_logo"
            src={bird_crew_logo}
            alt="bird_crew_logo"
          />
        </Link>
      </div>

      <div className="subscribe_form_container">
        <form className="subscribe_form">
          <h2>Suscribirse</h2>
          <div className="subscribe_form_input">
            <input
              id="subscribe-email"
              name="email"
              type="email"
              placeholder="ej. email@example.com"
              required
            />
            <button type="submit">Join</button>
          </div>
        </form>
      </div>

      <nav className="privacy">
        <Link to="/politicas-de-privacidad">
          <p className="privacy_politics">Políticas de privacidad</p>
        </Link>
        <small className="webpage_register">©2020 por The Bird Crew.</small>
      </nav>
    </footer>
  );
}

export default Footer;
