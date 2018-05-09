import * as DataLoader from 'dataloader';

import { DbConnection } from "../interfaces/DbConnectionInterface";
import { DataLoaders } from "../interfaces/DataLoaderInterface";
import { UserLoader } from './UserLoader';
import { UserInstance } from '../models/UserModel';
import { PostLoader } from './PostLoader';
import { PostInstance } from '../models/PostModel';
import { RequestedFields } from '../graphql/ast/RequestedFields';
import { DataLoaderParam } from '../interfaces/DataLoaderParamInterface';

export class DataLoaderFactory {

  constructor(private db: DbConnection, private requestedFields: RequestedFields) { }

  getLoaders(): DataLoaders {
    return {
      userLoader: new DataLoader<DataLoaderParam<number>, UserInstance>(
        (params: DataLoaderParam<number>[]) => UserLoader.batchUser(this.db.User, params, this.requestedFields),
        { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
      ),
      postLoader: new DataLoader<DataLoaderParam<number>, PostInstance>(
        (params: DataLoaderParam<number>[]) => PostLoader.batchPost(this.db.Post, params, this.requestedFields),
        { cacheKeyFn: (param: DataLoaderParam<number[]>) => param.key }
      )
    }
  }

}