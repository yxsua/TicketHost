import axiosClient from "./axiosClient";

export const obtenerComentarios = async (ticketId) => {
  const response = await axiosClient.get(`/comentarios/ticket/${ticketId}`);

  return response.data.data;
};

export const crearComentario = async (ticketId, mensaje) => {
  const response = await axiosClient.post(`/comentarios/ticket/${ticketId}`, {
    mensaje,
  });

  return response.data;
};
