import API from "./api";
import { USE_BACKEND } from "../config";

export const getClientes = () => {
  if (!USE_BACKEND) {
    return Promise.resolve({
      data: { data: [] },
    });
  }

  return API.get("/clientes");
};

export const createCliente = (data) => {
  if (!USE_BACKEND) {
    console.log("MOCK CREATE CLIENTE:", data);
    return Promise.resolve();
  }

  return API.post("/clientes", data);
};

export const updateCliente = (id, data) => {
  if (!USE_BACKEND) {
    console.log("MOCK UPDATE CLIENTE:", id, data);
    return Promise.resolve();
  }

  return API.put(`/clientes/${id}`, data);
};

export const deleteCliente = (id) => {
  if (!USE_BACKEND) {
    console.log("MOCK DELETE CLIENTE:", id);
    return Promise.resolve();
  }

  return API.delete(`/clientes/${id}`);
};