const AppError = require("../utils/AppError");

const validarLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email?.trim()) {
    return next(
      new AppError(
        "El email es obligatorio",
        400
      )
    );
  }

  if (!password?.trim()) {
    return next(
      new AppError(
        "La contraseña es obligatoria",
        400
      )
    );
  }

  next();
};

module.exports = validarLogin;