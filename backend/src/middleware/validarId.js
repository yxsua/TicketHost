const AppError = require("../utils/AppError");

const validarId = (req, res, next) => {
  var id = Number(req.params.id);

  if (id) {} else if (req.params.ticketId) {
    id = Number(req.params.ticketId);
  }

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