import React from "react";
import marketing_home from "../../Images/marketing_home.png";
import "../../Styles/Home/FirstSection.css";
import { Link } from "react-router";
function FirstSection() {
  return (
    <section className="first_section">
      <div className="text_left_section">
        <h1 className="Text_HomeOne">
          ¿Quieres que tu negocio
          <span className="crezca_highlight">
            <strong> CREZCA </strong>
          </span>
          ?
        </h1>
        <p className="Text_HomeTwo">
          En Bird Crew, convertimos ideas en estrategias, y estrategias en
          resultados. Potencia tu presencia, conecta con tu audiencia y haz
          crecer tu negocio con marketing que realmente funciona.
        </p>
        <Link to="/Contacto" className="contact_button">
          Contactanos
        </Link>
      </div>

      <img
        className="marketing_home_image"
        src={marketing_home}
        alt="Imagen de estrategia de marketing digital"
      />
    </section>
  );
}

export default FirstSection;
