var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

const UsuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  apellido: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  rol: {
    type: String,
    required: true
  }
});

UsuarioSchema.statics.autenticacion = function(username, password, callback) {
  Usuario.findOne({ username: username })
    .then(usuario => {
      if (!usuario) {
        // usuario no encontrado
        return callback("404", null);
      }
      bcrypt.compare(password, usuario.password, function(err, result) {
        if (result === true) return callback("200", usuario);
        // encontrado y validado
        else return callback("201", null); // encontrado pero no validado
      });
    })
    .catch(err => callback("500", null)); // error
};

UsuarioSchema.pre("save", function(next) {
  var usuario = this;
  bcrypt.hash(usuario.password, 10, function(err, hash) {
    if (err) {
      return next(err);
    }
    usuario.password = hash;
    next();
  });
});

var Usuario = mongoose.model("Usuario", UsuarioSchema);
module.exports = Usuario;
