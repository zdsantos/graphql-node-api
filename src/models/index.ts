import * as fs from 'fs';
import * as path from 'path';
import * as Sequelize from 'sequelize';
import { DbConnection } from '../interfaces/DbConnectionInterface';

const basename: string = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
let config = require(path.resolve(`${__dirname}./../config/config.json`))[env];
let db = null;

if(!db) {

  db = {};

  // false para desativar os operadores
  const operatorsAliases = {
    $in: Sequelize.Op.in
  };

  config = Object.assign({operatorsAliases}, config);

  const sequelize: Sequelize.Sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config  // todas as configurações extras, parâmetro config
  );

  /* pega todos os arquivos da pasta /models excluindo
  * tudo que não é js, tudo que começar com '.' e o index.js
  * e importa no db
  */

  fs.readdirSync(__dirname)
    .filter((file: string) => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file: string) => {
      const model= sequelize.import(path.join(__dirname, file));
      db[model['name']] = model;
    });

  // chama o método associate de todos os models passando todos ps models
  Object.keys(db).forEach((modelName: string) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  db['sequelize'] = sequelize;

}

export default <DbConnection> db;