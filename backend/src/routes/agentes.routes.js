const router = require("express").Router();

const controller = require("../controllers/agentes.controller");
const validarId = require("../middleware/validarId");
const validarAgente = require("../middleware/validarAgente");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

router.get("/", auth, roles("admin", "agente"),controller.obtenerAgentes);

router.get("/:id", validarId, auth, roles("admin", "agente"), controller.obtenerAgentePorId);

router.post("/", validarAgente, auth, roles("admin"), controller.crearAgente);

router.put("/:id", validarId, validarAgente, auth, roles("admin", "agente"), controller.actualizarAgente);

router.delete("/:id", validarId, auth, roles("admin"), controller.eliminarAgente);

module.exports = router;
