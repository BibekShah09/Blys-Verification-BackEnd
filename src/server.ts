import 'dotenv/config';
import * as  cluster from 'cluster';
import App from './app';
import logger from './api/utils/logger';
import validateEnv from './api/utils/validateEnv';
import { IndexRoute, CodeRoute } from './api/routes';

validateEnv();

const app = new App([
  new IndexRoute(),
  new CodeRoute(),
]);

const { NODE_ENV } = process.env;

if (cluster.isMaster && NODE_ENV === 'production') {
  // tslint:disable-next-line:no-var-requires
  const cpus = require('os').cpus().length;

  for (let i = 0; i < cpus; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    // worker finished because of an error
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      logger.error('Worker crashed. Starting a new one');
      cluster.fork();
    }
  });
} else {
  app.listen();
}
