import * as hpp from 'hpp';
import * as cors from 'cors';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as express from 'express';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import Routes from './api/interfaces/routes.interface';
import * as errorMiddleware from './api/middlewares/error.middleware';

class App {
  public app: express.Application;
  public port: (string | number);
  public productionEnv: boolean;
  public host: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.host = process.env.APP_HOST || '127.0.0.1';
    this.port = process.env.APP_PORT || 3000;
    this.productionEnv = process.env.NODE_ENV === 'production';

    this.setHostAndPort();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  private setHostAndPort() {
    this.app.set('port', this.port);
    this.app.set('host', this.host);
  }

  private initializeMiddlewares() {
    if (this.productionEnv) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(logger('combined'));
      this.app.use(compression());
      this.app.use(cors({ origin: 'blys.validator.com', credentials: true }));
    } else {
      this.app.use(logger('dev'));
      this.app.use(cors({ origin: true, credentials: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/api/v1', route.router);
    });
  }

  private initializeSwagger() {
    const swaggerJSDoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const options = {
      swaggerDefinition: {
        info: {
          title: 'Blys Validator APIs',
          version: '1.0.0',
          description: 'API for Blys Product',
        },
      },
      apis: ['swagger.yaml'],
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(specs));
  }

  private initializeErrorHandling() {
    // use the sentry handler.
    this.app.use(errorMiddleware.genericErrorHandler);
    this.app.use(errorMiddleware.methodNotAllowed);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🚀 App listening on the port ${this.port}`);
    });
  }

  public getServer() {
    return this.app;
  }
}

export default App;
