import axios from "axios";
import { getCsrfToken, setCsrfToken } from "./readCsrfToken";

export const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  withCredentials: true,
});

let isRefreshing = false;
let queue = [];

const processQueue = (error = null) => {
  queue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });
  queue = [];
};
instance.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();

  if (csrfToken) {
    config.headers["X-CSRF-Token"] = csrfToken;
  }
  return config;
});
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 && error.response?.status !== 403) {
      return Promise.reject(error);
    }
    if (originalRequest.url.includes("/auth/refresh")) {
      return Promise.reject(error);
    }
    if (originalRequest._retry) {
      return Promise.reject(error);
    }
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({
          resolve: () => resolve(instance(originalRequest)),
          reject,
        });
      });
    }
    originalRequest._retry = true;
    isRefreshing = true;
    try {
      const res = await instance.post("/auth/refresh");
      setCsrfToken(res.data.csrfToken);
      processQueue();
      isRefreshing = false;
      return instance(originalRequest);
    } catch (err) {
      processQueue(err);
      isRefreshing = false;
      return Promise.reject(err);
    }
  },
);
