var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

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

//authenticate input against database
UsuarioSchema.statics.authenticate = function (username, password, callback) {
    Usuario.findOne({ username: username })
        .then(usuario => {
            if(!usuario) {
                var err = new Error('Usuario no encontrado.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, usuario.password, function (err, result) {
                if (result === true) return callback(null, usuario);
                else return callback(err, null);
            })
        })
        .catch(err => callback(err, null));
}

//hashing a password before saving it to the database
UsuarioSchema.pre('save', function (next) {
    var usuario = this;
    bcrypt.hash(usuario.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        usuario.password = hash;
        next();
    })
});

var Usuario = mongoose.model('Usuario', UsuarioSchema);
module.exports = Usuario;