const router = require('express').Router();
const usuarios = require('../controladores/usuarios');

router.get('/', usuarios.obtenerTodos);
router.get('/obtener/:id', usuarios.obtener);
router.put('/actualizar/:id', usuarios.actualizar);
router.delete('/borrar/:id', usuarios.borrar);

router.post('/conectar', usuarios.conectar);
router.post('/registrar', usuarios.registrar);
router.get('/desconectar', usuarios.desconectar);

module.exports = router;