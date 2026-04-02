import React from "react";
import "../../Styles/Home/HomeCards.css";
import Card from "./Card";
import first_card from "../../Images/first_card.png";
import second_card from "../../Images/second_card.png";
import third_card from "../../Images/third_card.png";
function HomeCards() {
  return (
    <section className="home_cards">
      <h2 className="cards_header">¿POR QUÉ NOSOTROS? </h2>
      <div className="cards">
        <Card
          title="Creatividad que conecta"
          description="Diseñamos ideas originales que captan atención y generan impacto real en tu audiencia."
          image={first_card}
        />
        <Card
          title="Cercanía y compromiso"
          description="Trabajamos contigo como parte de tu equipo, siempre atentos y listos para actuar."
          image={second_card}
        />
        <Card
          title="Resultados medibles"
          description="Optimizamos cada campaña con datos reales para que tu inversión siempre rinda más."
          image={third_card}
        />
      </div>
    </section>
  );
}

export default HomeCards;
