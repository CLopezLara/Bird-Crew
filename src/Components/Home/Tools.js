import React from "react";
import "../../Styles/Home/Tools.css";
import google_logo from "../../Images/google_Ads.png";
import meta_logo from "../../Images/meta_ads.png";
function Tools() {
  return (
    <section className="tools">
      <h2 className="tools_title_section">¿Que herramientas utilizamos?</h2>
      <ul className="tool_list" aria-label="Herramientas">
        <li className="tool_item first_tool">
          <article className="tool_article">
            <div className="tool_card1">
              <h3 className="tool_title">Google Ads</h3>
              <p className="description">
                Alcanzamos a tu audiencia ideal en las plataformas sociales
                donde pasan más tiempo.
              </p>
            </div>
            <figure className="tool_logo" aria-hidden="true">
              <img
                className="logo_1"
                src={google_logo}
                alt="Logo de Google Ads"
              />
            </figure>
          </article>
        </li>

        <li className="tool_item second_tool">
          <article className="tool_article">
            <figure className="tool_logo" aria-hidden="true">
              <img className="logo_2" src={meta_logo} alt="Logo de Meta Ads" />
            </figure>
            <div className="tool_card2">
              <h3 className="tool_title2">Meta Ads</h3>
              <p className="description2">
                Llega a tus clientes en el momento exacto y conecta tu marca con
                quienes ya están buscando lo que ofreces.
              </p>
            </div>
          </article>
        </li>
      </ul>
    </section>
  );
}

export default Tools;
