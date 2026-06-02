import API from "./api";
import { USE_BACKEND } from "../config";

const fakeLogin = (role) => {
  return Promise.resolve({
    data: {
      data: {
        token: "fake-token-123",
        user: {
          id: 1,
          email: "test@test.com",
          role,
        },
      },
    },
  });
};

export const loginCliente = (data) => {
  if (!USE_BACKEND) return fakeLogin("cliente");
  return API.post("/auth/clientes/login", data);
};

export const loginAgente = (data) => {
  if (!USE_BACKEND) return fakeLogin("agente");
  return API.post("/auth/agentes/login", data);
};

export const loginAdmin = (data) => {
  if (!USE_BACKEND) return fakeLogin("admin");
  return API.post("/auth/admin/login", data);
};