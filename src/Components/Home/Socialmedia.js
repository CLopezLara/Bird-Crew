import React from "react";
import "../../Styles/Home/Socialmedia.css";
import facebookLogo from "../../Images/facebook-logo.png";
import instagramLogo from "../../Images/instagram-logo.png";
import xLogo from "../../Images/x-logo.png";
import tiktokLogo from "../../Images/tiktok-logo.png";
import youtubeLogo from "../../Images/youtube-logo.png";
function Socialmedia() {
  return (
    <section className="social-media">
      <h2 className="social-media-title">
        Tambien manejamos tus redes sociales
      </h2>
      <div className="carrousel-container">
        <div className="carrousel">
          <img src={facebookLogo} alt="facebook" className="carrousel-item" />
          <img src={instagramLogo} alt="instagram" className="carrousel-item" />
          <img src={xLogo} alt="x" className="carrousel-item" />
          <img src={tiktokLogo} alt="tiktok" className="carrousel-item" />
          <img src={youtubeLogo} alt="youtube" className="carrousel-item" />
          <img src={facebookLogo} alt="facebook" className="carrousel-item" />
          <img src={instagramLogo} alt="instagram" className="carrousel-item" />
          <img src={xLogo} alt="x" className="carrousel-item" />
          <img src={tiktokLogo} alt="tiktok" className="carrousel-item" />
          <img src={youtubeLogo} alt="youtube" className="carrousel-item" />
        </div>
      </div>
    </section>
  );
}

export default Socialmedia;
