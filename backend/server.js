/*** PR CRÉER MON SERVER QUI VA LISTEN / RES. => REQ. HTTP ***/

//IMPORTER PACKAGE HTTP DE NODE (MÉTHOE REQUIRE)
const http = require('http');

//IMPORTER APPLI. EXPRESS
const app = require('./app');


//F. QUI RENVOIE UN PORT VALIDE (STRING / NBRE)
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };

//DIRE À APPLI.SUR QUEL PORT TOURNER PAR DÉFAUT
const port = normalizePort(process.env.PORT || '3000');//SINON VAR PR USE PORT SEND PAR ENV.(OÙ TOURNE ON SERVER)
app.set('port', port);

//F. QUI RECHERCHE/GÉRE ERREURS
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
        default:
        throw error;
    }
    };

//CRÉER SERVER (MÉTHOE CREATE SERVER) QUI PREND EN ARG. LA F. QUI SERA CALL À CHQ REQ.
const server = http.createServer(app);

//LISTEN REQ. ENVOYÉES (MÉTODE ON)
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

