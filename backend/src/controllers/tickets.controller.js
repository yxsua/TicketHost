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
  const { cliente_id, categoria_id, titulo, descripcion } = req.body;

  await ticketsService.crearTicket(req.body);

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
  const { estado, usuario, comentario } = req.body;

  await ticketsService.cambiarEstado(
    req.params.id,
    estado,
    usuario,
    comentario,
  );

  res.status(200).json({
    success: true,
    message: "Estado actualizado correctamente",
  });
});

module.exports = {
  obtenerTickets,
  obtenerTicketPorId,
  crearTicket,
  actualizarTicket,
  eliminarTicket,
  cambiarEstado,
};
