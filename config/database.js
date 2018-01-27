const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

var
    localhost = "localhost",
    port = "27017",
    nombreDB = "dbKioscoHeidi",
    DB = "mongodb://"+localhost+":"+port+"/"+nombreDB;

module.exports = {
    localhost: localhost,
    port: port,
    nombreDB: nombreDB,
    direccionDB: DB,
    conectarDB: () => {
        mongoose.connect(DB)
            .then(() => console.log("DB conectada exitosamente"))
            .catch(err => console.error(err));
    }
}