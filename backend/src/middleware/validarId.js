const AppError = require("../utils/AppError");

const validarId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return next(
      new AppError(
        "ID inválido, revisa el formato proporcionado. Debe ser un número entero positivo",
        400
      )
    );
  }

  next();
};

module.exports = validarId;