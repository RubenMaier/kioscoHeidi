const mongoose = require('mongoose');
const productos = require('../modelos/productos');

module.exports = {

  obtenerTodos: (req, res, next) => {
      productos.find((err, productos) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(productos);
      });
  },

  agregar: (req, res, next) => {
      const nuevoProducto = new productos({
          _id:        new mongoose.Types.ObjectId(),
          nombre:     req.body.nombre,
          categoria:  req.body.categoria,
          marca:      req.body.marca,
          precio:     req.body.precio,
          segun:      req.body.segun
      });
      nuevoProducto.save()
          .then(producto => res.status(200).json( { 'resultado': 'el producto fue agregado exitosamente' } ))
          .catch(err => res.status(500).json( { 'resultado': 'el producto no se pudo agregar a la DB' } ));
  },

  obtener: (req, res, next) => {
      const id = req.params.id;
      productos.findById(id)
          .then(producto => {
              if(producto) res.status(200).json(producto);
              else res.status(404).json(producto);
          })
          .catch(err => res.status(500).json(err));
  },

  actualizar: (req, res, next) => {
      const id = req.params.id;
      const productoUpdate = {
        id:         id,
        nombre:     req.body.nombre,
        categoria:  req.body.categoria,
        marca:      req.body.marca,
        precio:     req.body.precio,
        segun:      req.body.segun
      }
      productos.update( { _id: id }, { $set: productoUpdate } )
          .then(producto => res.status(200).json({
              'resultado': 'el producto fue actualizado correctamente'
          }))
          .catch(err => res.status(500).json({
              'resultado': 'el producto no pudo ser actualizado'
          }));
  },

  borrar: (req, res, next) => {
      const id = req.params.id;
      productos.findByIdAndRemove(id)
          .then(producto => res.status(200).json({'resultado': 'el producto fue borrado correctamente'}))
          .catch(err => res.status(500).json({'resultado': 'el producto no pudo ser borrado'}));
  }
}