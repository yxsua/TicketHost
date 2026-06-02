const router = require("express").Router();

const controller = require("../controllers/clientes.controller");
const validarId = require("../middleware/validarId");
const validarCliente = require("../middleware/validarCliente");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

router.get("/", auth, roles("admin", "agente"), controller.obtenerClientes);

router.get("/:id", validarId, auth, roles("admin", "agente", "cliente"), controller.obtenerClientePorId);

router.post("/", validarCliente, controller.crearCliente);

router.put("/:id", validarId, validarCliente, auth, roles("admin", "cliente"), controller.actualizarCliente);

router.delete("/:id", validarId, auth, roles("admin"), controller.eliminarCliente);

module.exports = router;
