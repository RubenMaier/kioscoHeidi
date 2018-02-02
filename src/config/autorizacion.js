
function noAutorizado(req) {
    return !req.session || !req.session.authenticated;
}

function validarAutorizacion(req, res, next) {
    const parametro = req.url.split("/");
    console.log("[autorizacion]: " +parametro);
    if(parametro[1] === "productos" && noAutorizado(req)) return;
    next();
}

module.exports = (server) => {
    server.use(validarAutorizacion);
}; 