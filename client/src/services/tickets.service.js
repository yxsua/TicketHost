import API from "./api";

export const getTickets = () => API.get("/tickets");

export const getTicketById = (id) =>
  API.get(`/tickets/${id}`);

export const createTicket = (data) =>
  API.post("/tickets", data);

export const updateTicket = (id, data) =>
  API.put(`/tickets/${id}`, data);

export const deleteTicket = (id) =>
  API.delete(`/tickets/${id}`);

export const cambiarEstado = (id, data) =>
  API.patch(`/tickets/${id}/estado`, data);