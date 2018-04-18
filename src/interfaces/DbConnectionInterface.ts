import * as Sequelize from 'sequelize';
import { ModelsInterfaces } from './ModelsInterfaces';

export interface DbConnection extends ModelsInterfaces {

  sequelize: Sequelize.Sequelize;

}