import axios from "axios";

export const api = axios.create({
  baseURL: "https://syncrobabybackend-hmc2g7cqe9bfbqcr.brazilsouth-01.azurewebsites.net/syncrobaby",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@App:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
