var express = require('express');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');

var productos = require('./routes/productos');

var server = express();
var port = process.env.PORT || 3000;

// middleware
server.use(logger('dev')); //cuando inicio la app me muestra los request y datos extras por consola (uso morgan)
server.use(express.json());
server.use(express.urlencoded({ extended: false })); //para recibir datos desde formularios o recibir datos desde urls
server.use(cors()); // nos permite comunicar el servidor de backend con el servidor de frontend

// static files
server.use(express.static(path.join(__dirname, 'public')));

// routes - rest web api
server.use('/productos', productos);

// start the server
server.listen(port, function(){
  console.log('escuchando en el puerto: ' + port);
});