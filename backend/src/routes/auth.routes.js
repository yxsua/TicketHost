const router = require("express").Router();

const controller = require("../controllers/auth.controller");

const validarLogin = require("../middleware/validarLogin");

router.post("/clientes/login", validarLogin, controller.loginCliente);

router.post("/agentes/login", validarLogin, controller.loginAgente);

router.post("/admin/login", validarLogin, controller.loginAdmin);

module.exports = router;
