import axiosClient from "./axiosClient";

export const obtenerAgentes = async () => {
  const response = await axiosClient.get("/agentes");

  return response.data.data;
};

export const crearAgente = async (data) => {
  const response = await axiosClient.post("/agentes", data);

  return response.data;
};

export const actualizarAgente = async (id, data) => {
  const response = await axiosClient.put(`/agentes/${id}`, data);

  return response.data;
};

export const eliminarAgente = async (id) => {
  const response = await axiosClient.delete(`/agentes/${id}`);

  return response.data;
};
