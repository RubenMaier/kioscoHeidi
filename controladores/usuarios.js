const usuarios = require('../modelos/usuarios');

const validarAutorizacion = (session) => {
    usuarios.findById(session)
        .then(usuario => {
            if(usuario === null) return false;
            else return true;
        })
        .catch(err => { return null });
}

module.exports = {

    validarAutorizacion: validarAutorizacion,

    conectar: (req, res, next) => {
        usuarios.authenticate(req.body.username, req.body.password, (error, usuario) => {
            if (!usuario || error) {
                res.json({
                    'resultado': '401'
                });
                var err = new Error('Password o username incorrectos');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = usuario._id;
                res.status(200).json({
                    'resultado': '200'
                })
            }
        })
    },

    registrar: (req, res, next) => {
        const nuevoUsuario = new usuarios({
            username:   req.body.username,
            password:   req.body.password,
            nombre:     req.body.nombre,
            apellido:   req.body.apellido,
            email:      req.body.email,
            rol:        req.body.rol
        });

        usuarios.create(nuevoUsuario)
            .then(usuario => {
                req.session.userId = usuario._id;
                res.redirect('/productos/ver');
            });
    },

    desconectar: (req, res, next) => {
        if (req.session) {
            req.session.destroy(function (err) {
                if (err) {
                    return next(err);
                } else {
                    return res.status(200).json({ 'resultado': 'se logro desconectar'});
                }
            });
            }

    },

    obtenerTodos: (req, res, next) => {
        usuarios.find((err, usuarios) => {
            if (err) return res.status(500).json(err);
            res.status(200).json(usuarios);
        });
    },

    usernameObtener: (req, res, next) => {
        const username = req.params.username;
        usuarios.findOne({username: username})
            .then(usuario => {
                if(usuario) res.status(200).json(usuario);
                else res.status(404).json(usuario);
            })
            .catch(err => res.status(500).json(err));
    },

    emailObtener: (req, res, next) => {
        const email = req.params.email;
        usuarios.findOne({email: email})
            .then(usuario => {
                if(usuario) res.status(200).json(usuario);
                else res.status(404).json(usuario);
            })
            .catch(err => res.status(500).json(err));
    },

    actualizar: (req, res, next) => {
        const username = req.params.username;
        const usuarioUpdate = {
            username:   username,
            password:   req.body.password,
            nombre:     req.body.nombre,
            apellido:   req.body.apellido,
            email:      req.body.email,
            rol:        req.body.rol
        }
        usuarios.update( { username: username }, { $set: usuarioUpdate } )
            .then(usuario => res.status(200).json({
                'resultado': 'el usuario fue actualizado correctamente'
            }))
            .catch(err => res.status(500).json({
                'resultado': 'el usuario no pudo ser actualizado'
            }));
    },

    borrar: (req, res, next) => {
        const id = req.params.id;
        usuarios.findByIdAndRemove(id)
            .then(usuario => res.status(200).json(usuario))
            .catch(err => res.status(500).json(err));
    }
}