const serverURL = process.env.REACT_APP_SERVER_URL;
export const sendData = async (formData) => {
  const res = await fetch(`${serverURL}/api/contact`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const error = new Error(data?.message || "❌ Error al mandar los datos");
    error.data = data;
    throw error;
  }
  return data;
};
