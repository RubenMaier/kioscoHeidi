module.exports = (server) => {
    
    const productos = require('../rutas/productos');
    server.use('/productos', productos);

    const usuarios = require('../rutas/usuarios');
    server.use('/usuarios', usuarios);
    
};