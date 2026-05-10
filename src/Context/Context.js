import { useEffect, useState, createContext, useCallback } from "react";
import { checkLogin } from "../Components/Services/authServices.js";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const checkLoginState = useCallback(async () => {
    setLoading(true);
    try {
      const res = await checkLogin();
      console.log("checkLogin response:", res);
      const { loggedIn: logged_in, user } = res;
      console.log(user);
      setLoggedIn(logged_in);
      setUser(user);
    } catch (err) {
      console.error("wuichu:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);
  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
