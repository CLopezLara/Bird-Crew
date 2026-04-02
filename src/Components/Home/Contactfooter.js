import React from "react";
import "../../Styles/Home/Contactfooter.css";
import { useNavigate } from "react-router";
function Contactfooter() {
  const Navigate = useNavigate();
  return (
    <section className="contact_footer">
      <h3 className="contact_info">
        CONTACTANOS PARA UNA <br /> CONSULTA DE MARKETING <br />
        <span className="free">GRATUITA</span>
      </h3>
      <button
        onClick={(e) => Navigate("/Contacto")}
        className="button_contact_footer"
      >
        Contactanos
      </button>
    </section>
  );
}

export default Contactfooter;
