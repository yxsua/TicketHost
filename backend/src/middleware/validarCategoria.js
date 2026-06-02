const AppError = require("../utils/AppError");

const validarCategoria = (req, res, next) => {
  const { nombre } = req.body;

  if (!nombre?.trim()) {
    return next(new AppError("El nombre de la categoría es obligatorio", 400));
  }

  next();
};

module.exports = validarCategoria;
