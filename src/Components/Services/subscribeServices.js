import { instance } from "../Utils/AuthInterceptor";

export const subscribe = async (id) => {
  const res = await instance.post(
    `${process.env.REACT_APP_SERVER_URL}/api/subscribe`,
    { id },
  );
  return res.data;
};

export const unsubscribe = async (id) => {
  const res = await instance.post(
    `${process.env.REACT_APP_SERVER_URL}/api/unsubscribe`,
    { id },
  );
  return res.data;
};
