const express = require('express');

module.exports = (server) => {
    
    require('./database').conectarDB();

    require('./middlewares')(server);

    require('./routes')(server);
};