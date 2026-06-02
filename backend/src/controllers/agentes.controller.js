const agentesService = require("../services/agentes.service");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const obtenerAgentes = asyncHandler(async (req, res) => {
  const agentes = await agentesService.obtenerAgentes();

  res.status(200).json({
    success: true,
    data: agentes,
  });
});

const obtenerAgentePorId = asyncHandler(async (req, res) => {
  const agente = await agentesService.obtenerAgentePorId(req.params.id);

  if (!agente) {
    throw new AppError("Agente no encontrado", 404);
  }

  res.status(200).json({
    success: true,
    data: agente,
  });
});

const crearAgente = asyncHandler(async (req, res) => {
  const { nombre, email, departamento, password } = req.body;

  const bcrypt = require("bcrypt");

  const passwordHash = await bcrypt.hash(password, 10);

  await agentesService.crearAgente(nombre, email, departamento, passwordHash);

  res.status(201).json({
    success: true,
    message: "Agente creado correctamente",
  });
});

const actualizarAgente = asyncHandler(async (req, res) => {
  const { nombre, email, departamento, password } = req.body;

  const bcrypt = require("bcrypt");

  const passwordHash = await bcrypt.hash(password, 10);

  await agentesService.actualizarAgente(
    req.params.id,
    nombre,
    email,
    departamento,
    passwordHash,
  );

  res.status(200).json({
    success: true,
    message: "Agente actualizado correctamente",
  });
});

const eliminarAgente = asyncHandler(async (req, res) => {
  await agentesService.eliminarAgente(req.params.id);

  res.status(200).json({
    success: true,
    message: "Agente eliminado correctamente",
  });
});

module.exports = {
  obtenerAgentes,
  obtenerAgentePorId,
  crearAgente,
  actualizarAgente,
  eliminarAgente,
};
