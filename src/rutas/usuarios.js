const router = require("express").Router();
const usuarios = require("../controladores/usuarios");

router.get("/", usuarios.obtenerTodos);
router.get("/obtener/username/:username", usuarios.usernameObtener);
router.get("/obtener/email/:email", usuarios.emailObtener);
router.put("/actualizar/:username", usuarios.actualizar);
router.delete("/borrar/:username", usuarios.borrar);

router.post("/conectar", usuarios.conectar);
router.post("/registrar", usuarios.registrar);
router.get("/desconectar", usuarios.desconectar);

module.exports = router;