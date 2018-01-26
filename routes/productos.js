const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('dbKioscoHeidi', ['productos']);

// obtener todos los productos
router.get('/', (req, res, next) => {
    db.productos.find((err, productos) => {
      if (err) return next(err);
      res.json(productos);
    });
});

// agregar producto
router.post('/agregar', (req, res, next) => {
    const producto = req.body;
    if(!(producto.nombre+'')) {
        res.status(400).json({
          'error': 'Dato erroneo'
        });
    } else {
        db.productos.save(producto, (err, producto) => {
          if (err) return next(err);
          res.json(producto);
        });
    }
});

// obtener un solo producto
router.get('/obtener/:id', (req, res, next) => {
    db.productos.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, producto) => {
      if (err) return next(err);
      res.json(producto);
    });
});

// actualizar producto
router.put('/actualizar/:id', (req, res, next) => {
    const producto = req.body;
    let updateProducto = {};
    
    if(producto.nombre) {
      updateProducto.nombre = producto.nombre;
    }
    if(producto.categoria) {
      updateProducto.categoria = producto.categoria;
    }
    if(producto.marca) {
      updateProducto.marca = producto.marca;
    }
    if(producto.precio) {
      updateProducto.precio = producto.precio;
    }
    if(producto.segun) {
      updateProducto.segun = producto.segun;
    }
    if(!updateProducto) {
      res.status(400);
      res.json({'error': 'consulta erronea'});
    } else {
        db.productos.update({_id: mongojs.ObjectId(req.params.id)}, updateProducto, {}, (err, producto) => {
          if (err) return next(err);
          res.json(producto);
        });
    }
});

// borrar producto
router.delete('/borrar/:id', (req, res, next) => {
    db.productos.remove({_id: mongojs.ObjectId(req.params.id)}, (err, producto) => {
      if(err){ res.send(err); }
      res.json(producto);
    });
});

module.exports = router;