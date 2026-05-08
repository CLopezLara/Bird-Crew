const serverUrl = process.env.REACT_APP_SERVER_URL;
export const logout = async () => {
  const res = await fetch(`${serverUrl}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Fallo al cerrar sesion");
  }
};

export const login = async () => {
  const res = await fetch(`${serverUrl}/auth/url`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || "Error al iniciar sesion ");
  }

  return data;
};

export const getToken = async () => {
  const res = await fetch(`${serverUrl}/auth/token${window.location.search}`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    throw new Error(data?.message || "Error al iniciar sesion ");
  }
  return data;
};

export const checkLogin = async () => {
  const res = await fetch(`${serverUrl}/auth/logged_in`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data?.message || "Error al verificar sesion");
  }

  return data;
};
