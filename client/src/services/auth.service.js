import API from "./api";

export const loginCliente = (data) =>
  API.post("/auth/clientes/login", data);

export const loginAgente = (data) =>
  API.post("/auth/agentes/login", data);

export const loginAdmin = (data) =>
  API.post("/auth/admin/login", data);