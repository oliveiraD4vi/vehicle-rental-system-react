import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const auth = localStorage.getItem("GCUSER");
  if (auth) {
    const { token } = JSON.parse(auth);
    const tmpConfig = config;
    if (token) {
      tmpConfig.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
