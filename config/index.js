module.exports = (server) => {
    
    require('./database')(server);

    require('./middlewares')(server);

    require('./routes')(server);

    require('./error')(server);
};