import { useEffect, useState, createContext, useCallback } from "react";
import { checkLogin } from "../Components/Services/authServices.js";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const checkLoginState = useCallback(async () => {
    try {
      const res = await checkLogin();
      const { loggedIn: logged_in, user } = res;
      setLoggedIn(logged_in);
      setUser(user);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);
  return (
    <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>
      {children}
    </AuthContext.Provider>
  );
};
