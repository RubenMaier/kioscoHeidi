const logger = require('morgan');
const express = require('express');
const cors = require('cors');
const history = require('connect-history-api-fallback');

module.exports = (server) => {
    server.use(logger('dev')); //cuando inicio la app me muestra los request y datos extras por consola (uso morgan)
    server.use(express.json());
    server.use(express.urlencoded({ extended: false })); //para recibir datos desde formularios o recibir datos desde urls
    server.use(cors()); // nos permite comunicar el servidor de backend con el servidor de frontend

    const staticFileMiddleware = express.static('public');
    server.use(staticFileMiddleware);
    server.use(history({
        disableDotRule: true,
        verbose: true
    }));
    server.use(staticFileMiddleware);
}; 