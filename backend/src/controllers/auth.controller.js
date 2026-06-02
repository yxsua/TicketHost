const authService = require("../services/auth.service");

const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const loginCliente = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const resultado =
    await authService.loginCliente(
      email,
      password
    );

  if (!resultado) {
    throw new AppError(
      "Credenciales inválidas",
      401
    );
  }

  res.status(200).json({
    success: true,
    data: resultado,
  });
});

const loginAgente = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const resultado =
    await authService.loginAgente(
      email,
      password
    );

  if (!resultado) {
    throw new AppError(
      "Credenciales inválidas",
      401
    );
  }

  res.status(200).json({
    success: true,
    data: resultado,
  });
});

const loginAdmin = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;

    const resultado =
      await authService.loginAdmin(
        email,
        password,
      );

    res.status(200).json({
      success: true,
      ...resultado,
    });
  },
);

module.exports = {
  loginCliente,
  loginAgente,
  loginAdmin,
};