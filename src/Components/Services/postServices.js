import { instance } from "../Utils/AuthInterceptor";

const serverURL = process.env.REACT_APP_SERVER_URL;
export const savePost = async (formData) => {
  try {
    const res = await instance.post(`${serverURL}/api/posts`, formData);
    return res.data;
  } catch (error) {
    throw error.response?.data || { errors: ["Error al guardar post"] };
  }
};
export const getAllPosts = async () => {
  try {
    const res = await instance.get("/api/posts");
    return res.data;
  } catch (error) {
    throw error.response?.data || { errors: ["Error al obtener posts"] };
  }
};

export const getPostById = async (id) => {
  try {
    const res = await instance.get(`/api/posts/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { errors: ["Error al obtener post"] };
  }
};
export const updatePost = async (id, update) => {
  try {
    const res = await instance.patch(`/api/posts/${id}`, update);
    return res.data;
  } catch (error) {
    throw error.response?.data || { errors: ["Error al actualizar post"] };
  }
};
export const deletePost = async (id) => {
  try {
    const res = await instance.delete(`/api/posts/${id}`);
    return res.data;
  } catch (error) {
    throw error.response?.data || { errors: ["Error al borrar post"] };
  }
};

export const getPutPresignedUrl = async (image) => {
  try {
    const res = await instance.get(
      `/api/posts/presigned-url/upload?contentType=${image.type}`,
    );

    return res.data;
  } catch (error) {
    throw error.response?.data || { errors: ["Error al obtener url"] };
  }
};

export const getDeletePresignedUrl = async (image_key) => {
  try {
    const res = await instance.get(
      `/api/posts/presigned-url/delete?key=${image_key}`,
    );
    return res.data;
  } catch (error) {
    throw error.response?.data || { errors: ["Error al obtener url"] };
  }
};
export const uploadImage = async (presignedUrl, image) => {
  const res = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": image.type,
    },
    body: image,
  });

  if (!res.ok) {
    const err = new Error("Error al eliminar la imagen");
    err.errors = ["Error al subir la imagen"];
    throw err;
  }
  return true;
};

export const deleteImage = async (presignedUrl) => {
  const res = await fetch(presignedUrl, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = new Error("Error al eliminar la imagen");
    err.errors = ["Error al eliminar la imagen"];
    throw err;
  }
  return true;
};
