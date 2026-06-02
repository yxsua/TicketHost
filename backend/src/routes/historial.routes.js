const router = require("express").Router();

const controller = require("../controllers/historial.controller");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

router.get("/", auth, roles("admin", "agente"), controller.obtenerHistorial);

module.exports = router;
