const productos = require('../controladores/productos');

module.exports = (server) => {
    server.use('/productos', productos);
};