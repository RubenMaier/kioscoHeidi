const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const host = "localhost",
  port = "27017",
  db = "dbKioscoHeidi",
  url = `mongodb://${host}:${port}/${db}`;

module.exports = server => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(url)
    .then(() => console.log("DB conectada exitosamente"))
    .catch(err => console.error(err));

  const conexion = mongoose.connection;
  conexion.on("error", console.error.bind(console, "error en conexion:"));
  conexion.once("open", function() {});

  server.use(
    session({
      secret: "work hard",
      resave: true,
      saveUninitialized: false,
      store: new MongoStore({
        mongooseConnection: conexion
      })
    })
  );
};
