import axiosClient from "./axiosClient";

export const obtenerTickets = async () => {
  const response = await axiosClient.get("/tickets");

  return response.data.data;
};

export const obtenerTicketPorId = async (id) => {
  const response = await axiosClient.get(`/tickets/${id}`);

  return response.data.data;
};

export const obtenerMisTickets = async () => {
  const response = await axiosClient.get("/tickets/mis-tickets");

  return response.data.data;
};

export const obtenerMisAsignados = async () => {
  const response = await axiosClient.get("/tickets/mis-asignados");

  return response.data.data;
};

export const obtenerTicketsSinAsignar = async () => {
  const response = await axiosClient.get("/tickets/sin-asignar");

  return response.data.data;
};

export const crearTicket = async (ticket) => {
  const response = await axiosClient.post("/tickets", ticket);

  return response.data;
};

export const actualizarTicket = async (id, ticket) => {
  const response = await axiosClient.put(`/tickets/${id}`, ticket);

  return response.data;
};

export const eliminarTicket = async (id) => {
  const response = await axiosClient.delete(`/tickets/${id}`);

  return response.data;
};

export const asignarmeTicket = async (ticketId) => {
  const response = await axiosClient.patch(`/tickets/${ticketId}/asignar`);

  return response.data;
};

export const cambiarEstadoTicket = async (ticketId, payload) => {
  const response = await axiosClient.patch(
    `/tickets/${ticketId}/estado`,
    payload,
  );

  return response.data;
};

export const obtenerHistorialTicket = async (ticketId) => {
  const response = await axiosClient.get(`/tickets/${ticketId}/historial`);

  return response.data.data;
};
