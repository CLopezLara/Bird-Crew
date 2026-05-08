import { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../Context/Context";
import { getToken } from "../Services/authServices";

function CallbackAuth() {
  const called = useRef(false);
  const { checkLoginState, loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn === false) {
      try {
        if (called.current) return;
        called.current = true;
        getToken().then(() => {
          checkLoginState();
          navigate("/");
        });
      } catch (err) {
        alert(err.message);
        navigate("/");
      }
    } else if (loggedIn === true) {
      navigate("/");
    }
  }, [checkLoginState, loggedIn, navigate]);
  return <></>;
}
export default CallbackAuth;
