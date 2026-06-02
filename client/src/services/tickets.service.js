import API from "./api";
import { USE_BACKEND } from "../config";
import { ticketsMock } from "../mock/tickets.mock";

// GET ALL
export const getTickets = () => {
  if (!USE_BACKEND) {
    return Promise.resolve({
      data: { data: ticketsMock },
    });
  }

  return API.get("/tickets");
};

// GET BY ID
export const getTicketById = (id) => {
  if (!USE_BACKEND) {
    const ticket = ticketsMock.find((t) => t.id == id);

    return Promise.resolve({
      data: { data: ticket },
    });
  }

  return API.get(`/tickets/${id}`);
};

// CREATE
export const createTicket = (data) => {
  if (!USE_BACKEND) {
    console.log("MOCK CREATE:", data);
    return Promise.resolve();
  }

  return API.post("/tickets", data);
};

// DELETE
export const deleteTicket = (id) => {
  if (!USE_BACKEND) {
    console.log("MOCK DELETE:", id);
    return Promise.resolve();
  }

  return API.delete(`/tickets/${id}`);
};

// CAMBIAR ESTADO
export const cambiarEstado = (id, data) => {
  if (!USE_BACKEND) {
    console.log("MOCK STATUS:", id, data);
    return Promise.resolve();
  }

  return API.patch(`/tickets/${id}/estado`, data);
};