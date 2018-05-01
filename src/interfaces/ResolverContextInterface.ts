import { AuthUser } from "./AuthUserInterface";
import { DbConnection } from "./DbConnectionInterface";
import { DataLoaders } from "./DataLoaderInterface";

export interface ResolverContext {

  db?: DbConnection;
  authorization?: string;
  authUser?: AuthUser;
  dataloaders?: DataLoaders;
  
}