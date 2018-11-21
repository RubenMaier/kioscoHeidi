var mongoose = require("mongoose");
var Esquema = mongoose.Schema;

var Producto = new Esquema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    nombre: { type: String },
    categoria: { type: String },
    marca: { type: String },
    precio: { type: Number },
    segun: { type: String }
  },
  {
    collection: "productos"
  }
);

module.exports = mongoose.model("Producto", Producto);
