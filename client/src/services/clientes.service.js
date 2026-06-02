import API from "./api";

export const getClientes = () =>
  API.get("/clientes");

export const createCliente = (data) =>
  API.post("/clientes", data);

export const updateCliente = (id, data) =>
  API.put(`/clientes/${id}`, data);

export const deleteCliente = (id) =>
  API.delete(`/clientes/${id}`);