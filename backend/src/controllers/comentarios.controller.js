const comentariosService = require("../services/comentarios.service");

const asyncHandler = require("../utils/asyncHandler");

const obtenerComentariosPorTicket = asyncHandler(async (req, res) => {
  console.log("params:", req.params);
  const comentarios = await comentariosService.obtenerComentariosPorTicket(
    req.params.ticketId,
  );

  res.status(200).json({
    success: true,
    data: comentarios,
  });
});

const crearComentario = asyncHandler(async (req, res) => {
  console.log("params:", req.params);
  console.log("body:", req.body);
  const { mensaje } = req.body;

  await comentariosService.crearComentario({
    ticket_id: req.params.ticketId,

    usuario_id: req.user.id,

    usuario_tipo: req.user.tipo,

    mensaje,
  });

  res.status(201).json({
    success: true,
    message: "Comentario agregado correctamente",
  });
});

module.exports = {
  obtenerComentariosPorTicket,
  crearComentario,
};
