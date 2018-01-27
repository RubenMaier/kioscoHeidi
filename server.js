const express = require('express');
const server = express();

require('./config')(server);

// static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'public')));

// start the server
let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('escuchando en el puerto: ' + port);
});