import app from './app';
import db from './models';
import * as http from 'http';
import { normalizePort, onError, onListening } from './utils/utils';

const server = http.createServer(app);
const port = normalizePort(process.env.port || 3000);

db.sequelize.sync()
  .then(() => {

    server.listen(3000);
    server.on('error', onError(server));
    server.on('listening', onListening(server));

  }, (err) => {
    console.log('Error on connect with db');
    console.log(err);
  });