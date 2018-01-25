const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('dbKioscoHeidi', ['productos']);

// GET All productos
router.get('/productos', (req, res, next) => {
    db.productos.find((err, productos) => {
      if (err) return next(err);
      res.json(productos);
    });
});

// Single producto
router.get('/productos/:id', (req, res, next) => {
    db.productos.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, producto) => {
      if (err) return next(err);
      res.json(producto);
    });
});

// Add producto
router.post('/productos', (req, res, next) => {
    const producto = req.body;
    if(!producto.title || !(producto.isDone + '')) {
        res.status(400).json({
          'error': 'Dato erroneo '
        });
    } else {
        db.producto.save(producto, (err, producto) => {
          if (err) return next(err);
          res.json(producto);
        });
    }
});

// Delete producto
router.delete('/productos/:id', (req, res, next) => {
    db.productos.remove({_id: mongojs.ObjectId(req.params.id)}, (err, producto) => {
      if(err){ res.send(err); }
      res.json(producto);
    });
})

// Update producto
router.put('/productos/:id', (req, res, next) => {
    const producto = req.body;
    let updateProducto = {};
    
    if(producto.isDone) {
      updateProducto.isDone = producto.isDone;
    }
    if(producto.title) {
      updateProducto.title = producto.title;
    }
    if(!updateProducto) {
      res.status(400);
      res.json({'error': 'bad request'});
    } else {
        db.productos.update({_id: mongojs.ObjectId(req.params.id)}, updateProducto, {}, (err, producto) => {
          if (err) return next(err);
          res.json(producto);
        });
    }
});

module.exports = router;