const AppError = require("../utils/AppError");

const validarTicket = (req, res, next) => {
  const { cliente_id, categoria_id, titulo, descripcion } = req.body;

  if (!categoria_id) {
    return next(new AppError("El ID de la categoría es obligatorio", 400));
  }

  if (!titulo?.trim()) {
    return next(new AppError("El título es obligatorio", 400));
  }

  if (!descripcion?.trim()) {
    return next(new AppError("La descripción es obligatoria", 400));
  }

  next();
};

module.exports = validarTicket;
