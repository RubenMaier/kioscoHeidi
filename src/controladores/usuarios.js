const usuarios = require('../modelos/usuarios');

module.exports = {

    conectar: (req, res, next) => {
        usuarios.autenticacion(req.body.username, req.body.password, (error, usuario) => {
            var booleano = error !== "200"
            if(error !== "200") return res.json({'error': error});
            req.session.authenticated = true;
            console.log("conectar: " + JSON.stringify(req.session));
            res.json({'error': error, 'resultado': usuario._id});
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
            .then(usuario => res.status(200).json(usuario))
            .catch(err => res.json({'resultado': '500'}));
    },

    desconectar: (req, res, next) => {
		delete req.session.authenticated;
		console.log("desconectar: " + JSON.stringify(req.session));
        res.status(200).json({ 'resultado': '200'});
    },

    obtenerTodos: (req, res, next) => {
        usuarios.find((err, usuarios) => {
            if (err) return res.json({'resultado': '500'});
            res.status(200).json(usuarios);
        });
    },

    usernameObtener: (req, res, next) => {
        const username = req.params.username;
        usuarios.findOne({username: username})
            .then(usuario => {
                if(usuario) res.status(200).json(usuario);
                else res.json({'resultado': '404'});
            })
            .catch(err => res.json({'resultado': '500'}));
    },

    emailObtener: (req, res, next) => {
        const email = req.params.email;
        usuarios.findOne({email: email})
            .then(usuario => {
                if(usuario) res.status(200).json(usuario);
                else res.json({'resultado': '404'});
            })
            .catch(err => res.json({'resultado': '500'}));
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
            .then(usuario => res.status(200).json({'resultado': '200'}))
            .catch(err => res.json({'resultado': '500'}));
    },

    borrar: (req, res, next) => {
        const id = req.params.id;
        usuarios.findByIdAndRemove(id)
            .then(usuario => res.status(200).json(usuario))
            .catch(err => res.json({'resultado': '500'}));
    }
}