import { instance } from "../Utils/AuthInterceptor";

export const subscribe = async (id) => {
  const res = await instance.post(`/api/subscribe`, { id });
  return res.data;
};

export const unsubscribe = async (id) => {
  const res = await instance.post(`/api/unsubscribe`, { id });
  return res.data;
};
