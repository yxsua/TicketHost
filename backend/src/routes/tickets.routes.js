const router = require("express").Router();

const controller = require("../controllers/tickets.controller");
const historialController = require("../controllers/historial.controller");
const validarId = require("../middleware/validarId");
const validarTicket = require("../middleware/validarTicket");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

router.get("/", auth, roles("admin", "agente"), controller.obtenerTickets);

router.get("/:id", validarId, auth, roles("admin", "agente", "cliente"), controller.obtenerTicketPorId);

router.post("/", validarTicket, auth, roles("admin", "agente", "cliente"), controller.crearTicket);

router.put("/:id", validarId, validarTicket, auth, roles("admin", "agente", "cliente"), controller.actualizarTicket);

router.delete("/:id", validarId, auth, roles("admin"), controller.eliminarTicket);

router.patch("/:id/estado", validarId, auth, roles("admin", "agente"), controller.cambiarEstado);

router.get("/:id/historial", validarId, auth, roles("admin", "agente", "cliente"), historialController.obtenerHistorialPorTicket);

module.exports = router;
