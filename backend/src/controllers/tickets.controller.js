const ticketsService = require("../services/tickets.service");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const obtenerTickets = asyncHandler(async (req, res) => {
  const tickets = await ticketsService.obtenerTickets();

  res.status(200).json({
    success: true,
    data: tickets,
  });
});

const obtenerTicketPorId = asyncHandler(async (req, res) => {
  const ticket = await ticketsService.obtenerTicketPorId(req.params.id);

  if (!ticket) {
    throw new AppError("Ticket no encontrado", 404);
  }

  res.status(200).json({
    success: true,
    data: ticket,
  });
});

const crearTicket = asyncHandler(async (req, res) => {
  const ticket = {
    ...req.body,
    cliente_id: req.user.tipo === "cliente" ? req.user.id : req.body.cliente_id,
  };

  await ticketsService.crearTicket(ticket);

  res.status(201).json({
    success: true,
    message: "Ticket creado correctamente",
  });
});

const actualizarTicket = asyncHandler(async (req, res) => {
  await ticketsService.actualizarTicket(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: "Ticket actualizado",
  });
});

const eliminarTicket = asyncHandler(async (req, res) => {
  await ticketsService.eliminarTicket(req.params.id);

  res.status(200).json({
    success: true,
    message: "Ticket eliminado",
  });
});

const cambiarEstado = asyncHandler(async (req, res) => {
  const { estado, comentario } = req.body;

  await ticketsService.cambiarEstado(
    req.params.id,
    estado,
    req.user.nombre,
    comentario,
  );

  res.status(200).json({
    success: true,
    message: "Estado actualizado correctamente",
  });
});

const obtenerMisTickets = asyncHandler(async (req, res) => {
  const tickets = await ticketsService.obtenerTicketsCliente(req.user.id);

  res.status(200).json({
    success: true,
    data: tickets,
  });
});

const obtenerTicketsSinAsignar = asyncHandler(async (req, res) => {
  const tickets = await ticketsService.obtenerTicketsSinAsignar();

  res.status(200).json({
    success: true,
    data: tickets,
  });
});

const asignarTicket = asyncHandler(async (req, res) => {
  await ticketsService.asignarTicket(req.params.id, req.user.id);

  res.status(200).json({
    success: true,
    message: "Ticket asignado",
  });
});

const obtenerMisAsignados = asyncHandler(async (req, res) => {
  const tickets = await ticketsService.obtenerTicketsAgente(req.user.id);

  res.status(200).json({
    success: true,
    data: tickets,
  });
});

module.exports = {
  obtenerTickets,
  obtenerTicketPorId,
  crearTicket,
  actualizarTicket,
  eliminarTicket,
  cambiarEstado,
  obtenerMisTickets,
  obtenerTicketsSinAsignar,
  asignarTicket,
  obtenerMisAsignados,
};
