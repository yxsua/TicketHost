const router = require("express").Router();

const controller = require("../controllers/comentarios.controller");

const auth = require("../middleware/auth");

const roles = require("../middleware/roles");

const validarId = require("../middleware/validarId");

const validarAccesoTicket = require("../middleware/validarAccesoTicket");

router.get(
  "/ticket/:ticketId",
  validarId,
  auth,
  roles("admin", "agente", "cliente"),
  validarAccesoTicket,
  controller.obtenerComentariosPorTicket,
);

router.post(
  "/ticket/:ticketId",
  validarId,
  auth,
  roles("admin", "agente", "cliente"),
  validarAccesoTicket,
  controller.crearComentario,
);

module.exports = router;
