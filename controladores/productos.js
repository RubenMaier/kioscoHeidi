const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

const productos = require('../modelos/productos');

// obtener todos los productos
router.get('/', (req, res, next) => {
    productos.find((err, productos) => {
      if (err) return res.status(500).json(err);
      res.status(200).json(productos);
    });
});

// agregar producto
router.post('/agregar', (req, res, next) => {
    const nuevoProducto = new productos({
      _id: new mongoose.Types.ObjectId(),
      nombre: req.body.nombre,
      categoria: req.body.categoria,
      marca: req.body.marca,
      precio: req.body.precio,
      segun: req.body.segun
    });
    nuevoProducto.save()
      .then(producto => res.status(200).json( { 'resultado': 'el producto fue agregado exitosamente' } ))
      .catch(err => res.status(500).json( { 'resultado': 'el producto no se pudo agregar a la DB' } ));
});

// obtener un solo producto
router.get('/obtener/:id', (req, res, next) => {
  const id = req.params.id;
  productos.findById(id)
    .then(producto => {
      if(producto) res.status(200).json(producto);
      else res.status(404).json(producto);
    })
    .catch(err => res.status(500).json(err));
});

// actualizar producto
router.put('/actualizar/:id', (req, res, next) => {
  const id = req.params.id;

  const productoUpdate = {
    id: id,
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    marca: req.body.marca,
    precio: req.body.precio,
    segun: req.body.segun
  }

  productos.update( { _id: id }, { $set: productoUpdate } )
    .then(producto => {
      return res.status(200).json( { 'resultado': 'el producto fue actualizado correctamente' } );
    })
    .catch(err => {
      res.status(500).json( { 'resultado': 'el producto no pudo ser actualizado' } );
    });
});

// borrar producto
router.delete('/borrar/:id', (req, res, next) => {
  const id = req.params.id;
  productos.findByIdAndRemove(id)
    .then(producto => res.status(200).json(producto))
    .catch(err => res.status(500).json(err));
});

module.exports = router;