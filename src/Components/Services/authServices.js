import { clearCsrfToken, setCsrfToken } from "../Utils/readCsrfToken";

export const logout = async () => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Fallo al cerrar sesion");
  }
  clearCsrfToken();
};

export const login = async () => {
  const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/url`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || "Error al iniciar sesion ");
  }
  const { csrfToken } = data;
  setCsrfToken(csrfToken);
  return data;
};

export const getToken = async () => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/auth/token${window.location.search}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || "Error al iniciar sesion ");
  }
  const { csrfToken } = data;
  setCsrfToken(csrfToken);
  return data;
};

export const checkLogin = async () => {
  const res = await fetch(
    `${process.env.REACT_APP_SERVER_URL}/auth/logged_in`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Error al verificar sesion");
  }
  const { csrfToken } = data;

  setCsrfToken(csrfToken);
  return data;
};
