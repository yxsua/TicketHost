const categoriasService = require("../services/categorias.service");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const obtenerCategorias = asyncHandler(async (req, res) => {
  const categorias = await categoriasService.obtenerCategorias();

  res.status(200).json({
    success: true,
    data: categorias,
  });
});

const obtenerCategoriaPorId = asyncHandler(async (req, res) => {
  const categoria = await categoriasService.obtenerCategoriaPorId(
    req.params.id
  );

  if (!categoria) {
    throw new AppError("Categoría no encontrada", 404);
  }

  res.status(200).json({
    success: true,
    data: categoria,
  });
});

const crearCategoria = asyncHandler(async (req, res) => {
  const { nombre, descripcion } = req.body;

  await categoriasService.crearCategoria(nombre, descripcion);

  res.status(201).json({
    success: true,
    message: "Categoría creada correctamente",
  });
});

const actualizarCategoria = asyncHandler(async (req, res) => {
  const { nombre, descripcion } = req.body;

  await categoriasService.actualizarCategoria(
    req.params.id,
    nombre,
    descripcion
  );

  res.status(200).json({
    success: true,
    message: "Categoría actualizada correctamente",
  });
});

const eliminarCategoria = asyncHandler(async (req, res) => {
  await categoriasService.eliminarCategoria(req.params.id);

  res.status(200).json({
    success: true,
    message: "Categoría eliminada correctamente",
  });
});

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
};