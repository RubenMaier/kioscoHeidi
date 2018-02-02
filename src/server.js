const express = require('express');
const server = express();

require('./config')(server);

const path = require('path');
server.use(express.static(path.join(__dirname, 'public')));

let port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('escuchando en el puerto: ' + port);
});