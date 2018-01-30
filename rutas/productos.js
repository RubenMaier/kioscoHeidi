const router = require('express').Router();
const productos = require('../controladores/productos');

router.get('/', productos.obtenerTodos);
router.post('/agregar', productos.agregar);
router.get('/obtener/:id', productos.obtener);
router.put('/actualizar/:id', productos.actualizar);
router.delete('/borrar/:id', productos.borrar);

module.exports = router;