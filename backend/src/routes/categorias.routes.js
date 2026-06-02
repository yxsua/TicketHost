const router = require("express").Router();

const controller = require("../controllers/categorias.controller");
const validarId = require("../middleware/validarId");
const validarCategoria = require("../middleware/validarCategoria");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

router.get("/", auth, roles("admin", "agente", "cliente"), controller.obtenerCategorias);

router.get("/:id", validarId, auth, roles("admin", "agente", "cliente"), controller.obtenerCategoriaPorId);

router.post("/", validarCategoria, auth, roles("admin"), controller.crearCategoria);

router.put("/:id", validarId, validarCategoria, auth, roles("admin"), controller.actualizarCategoria);

router.delete("/:id", validarId, auth, roles("admin"), controller.eliminarCategoria);

module.exports = router;
