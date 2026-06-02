const clientesService = require("../services/clientes.service");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const obtenerClientes = asyncHandler(async (req, res) => {
  const clientes = await clientesService.obtenerClientes();

  res.status(200).json({
    success: true,
    data: clientes,
  });
});

const obtenerClientePorId = asyncHandler(async (req, res) => {
  const cliente = await clientesService.obtenerClientePorId(req.params.id);

  if (!cliente) {
    throw new AppError("Cliente no encontrado", 404);
  }

  res.status(200).json({
    success: true,
    data: cliente,
  });
});

const crearCliente = asyncHandler(async (req, res) => {
  const { nombre, email, telefono, compania, password } = req.body;

  const bcrypt = require("bcrypt");

  const passwordHash = await bcrypt.hash(password, 10);

  await clientesService.crearCliente(
    nombre,
    email,
    telefono,
    compania,
    passwordHash,
  );

  res.status(201).json({
    success: true,
    message: "Cliente creado correctamente",
  });
});

const actualizarCliente = asyncHandler(async (req, res) => {
  const { nombre, email, telefono, compania, password } = req.body;

  const bcrypt = require("bcrypt");

  const passwordHash = await bcrypt.hash(password, 10);

  await clientesService.actualizarCliente(
    req.params.id,
    nombre,
    email,
    telefono,
    compania,
    passwordHash,
  );

  res.status(200).json({
    success: true,
    message: "Cliente actualizado correctamente",
  });
});

const eliminarCliente = asyncHandler(async (req, res) => {
  await clientesService.eliminarCliente(req.params.id);

  res.status(200).json({
    success: true,
    message: "Cliente eliminado correctamente",
  });
});

module.exports = {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
};
