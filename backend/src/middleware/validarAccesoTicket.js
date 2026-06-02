const ticketsService = require("../services/tickets.service");

const AppError = require("../utils/AppError");

const asyncHandler = require("../utils/asyncHandler");

module.exports = asyncHandler(async (req, res, next) => {
  const ticketId = req.params.ticketId || req.params.id;

  const ticket = await ticketsService.obtenerTicketPorId(ticketId);

  if (!ticket) {
    throw new AppError("Ticket no encontrado", 404);
  }

  const { id: usuarioId, tipo } = req.user;

  /*
      Admin:
      acceso total
    */

  if (tipo === "admin") {
    req.ticket = ticket;

    return next();
  }

  /*
      Cliente:
      sólo sus tickets
    */

  if (tipo === "cliente" && ticket.CLIENTE_ID === usuarioId) {
    req.ticket = ticket;

    return next();
  }

  /*
      Agente:
      sólo tickets asignados
    */

  if (tipo === "agente") {
    req.ticket = ticket;

    return next();
  }

  throw new AppError("No tienes permisos para acceder a este ticket", 403);
});
