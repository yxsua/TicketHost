const AppError = require("../utils/AppError");

const validarAgente = (req, res, next) => {
  const { nombre, email } = req.body;

  if (!nombre?.trim()) {
    return next(new AppError("El nombre es obligatorio", 400));
  }

  if (!email?.trim()) {
    return next(new AppError("El email es obligatorio", 400));
  }

  next();
};

module.exports = validarAgente;
