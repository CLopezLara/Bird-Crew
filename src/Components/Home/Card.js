import React from "react";
import "../../Styles/Home/Card.css";
function Card({ title, description, image }) {
  return (
    <article className="card">
      <h3 className="card_title">{title}</h3>
      <p className="card_description">{description}</p>
      <img className="card_image" src={image} alt={title} />
    </article>
  );
}

export default Card;
