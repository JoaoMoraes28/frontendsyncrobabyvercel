import axios from "axios";

export const api = axios.create({
  baseURL: "syncrobaby/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@App:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
