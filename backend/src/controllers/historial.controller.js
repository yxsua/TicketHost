const historialService = require("../services/historial.service");
const asyncHandler = require("../utils/asyncHandler");

const obtenerHistorial = asyncHandler(async (req, res) => {
  const historial = await historialService.obtenerHistorial();

  res.json({
    success: true,
    data: historial,
  });
});

const obtenerHistorialPorTicket = asyncHandler(async (req, res) => {
  const historial = await historialService.obtenerHistorialPorTicket(
    req.params.id,
  );

  res.json({
    success: true,
    data: historial,
  });
});

module.exports = {
  obtenerHistorial,
  obtenerHistorialPorTicket,
};
