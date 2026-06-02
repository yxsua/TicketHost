import axiosClient from "./axiosClient";

export const obtenerClientes = async () => {
  const response = await axiosClient.get("/clientes");

  return response.data.data;
};

export const crearCliente = async (data) => {
  const response = await axiosClient.post("/clientes", data);

  return response.data;
};

export const actualizarCliente = async (id, data) => {
  const response = await axiosClient.put(`/clientes/${id}`, data);

  return response.data;
};

export const eliminarCliente = async (id) => {
  const response = await axiosClient.delete(`/clientes/${id}`);

  return response.data;
};
