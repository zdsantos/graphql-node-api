import * as express from 'express';
import * as graphqlHttp from 'express-graphql';

import db from './models';
import schema from './graphql/schema';
import { extractJwtMiddleware } from './middlewares/extract-jwt.middleware';
import { DataLoaderFactory } from './dataloaders/DataLoaderFactory';

class App {

  public express: express.Application;
  private dataLoaderFactory: DataLoaderFactory;

  constructor() {
    this.express = express();
    this.init();
  }

  private init(): void {
    this.dataLoaderFactory = new DataLoaderFactory(db);

    this.middleware();
  }

  private middleware(): void {

    this.express.use('/graphql',

      extractJwtMiddleware(),

      (req, res, next) => {
        req['context']['db'] = db;
        // cria uma nova instancia dos loaders a cada requisição, para não havar problemas com o cache
        req['context']['dataloaders'] = this.dataLoaderFactory.getLoaders();
        next();
      },

      graphqlHttp((req) => ({
        schema: schema,
        graphiql: process.env.NODE_ENV === 'development',
        context: req['context']
      }))
    );
  }

}

export default new App().express;