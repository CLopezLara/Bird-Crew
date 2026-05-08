import React, { useContext } from "react";
import "../../Styles/Layout/Footer.css";
import bird_crew_logo from "../../Images/bird_crew_logo_black.png";
import { Link } from "react-router";
import { AuthContext } from "../../Context/Context.js";
import { subscribe, unsubscribe } from "../Services/subscribeServices.js";

function Footer() {
  const { loggedIn, user, checkLoginState } = useContext(AuthContext);

  const onClick = async () => {
    if (!user?.subscribed) {
      try {
        const res = await subscribe(user?.id);
        alert(res.message);
      } catch (error) {
        alert("Hubo un error al suscribirse");
      }
    } else {
      try {
        const res = await unsubscribe(user?.id);
        alert(res.message);
      } catch (error) {
        alert("Hubo un error al desuscribirse");
      }
    }
    await checkLoginState();
  };
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
      <div
        className="subscribe_form_container"
        style={{ visibility: loggedIn ? "visible" : "hidden" }}
      >
        <section className="subscribe_form">
          <h2>Suscribirse</h2>
          {!user?.subscribed ? (
            <div className="subscribe_form_input">
              <button
                type="button"
                onClick={onClick}
                className="subscribe-button"
              >
                Unirse
              </button>
            </div>
          ) : (
            <div className="subscribe_form_input">
              <button
                type="button"
                onClick={onClick}
                className="unsubscribe-button"
              >
                Desuscribirse
              </button>
            </div>
          )}
        </section>
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
