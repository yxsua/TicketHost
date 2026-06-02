import axios from "axios";
import { USE_BACKEND, API_BASE } from "../config";

const API = axios.create({
  baseURL: API_BASE,
});

// interceptor solo si backend activo
API.interceptors.request.use((req) => {
  if (!USE_BACKEND) return req;

  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;