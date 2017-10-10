import Sequelize from 'sequelize';
import dotenv from 'dotenv';

import User from './../models/User';
import Group from './../models/Group';
import Message from './../models/Message';
import postgresConfig from './../config/postgresConfig';
import postgresConfigProd from './../config/postgresConfigProd';

dotenv.config();

const connection = process.env.NODE_ENV !== 'production' ?
  postgresConfig : postgresConfigProd;

const database = {
  connection,
  Sequelize,
  User: User(connection, Sequelize),
  Group: Group(connection, Sequelize),
  Message: Message(connection, Sequelize),
};

/**
 * 1:M relationships
 */
database.Message.belongsTo(database.Group, {
  foreignKey: 'groupId'
});
database.Group.hasMany(database.Message, {
  foreignKey: 'groupId'
});

database.Message.belongsTo(database.User, {
  foreignKey: 'author'
});
database.User.hasMany(database.Message, {
  foreignKey: 'author'
});

/**
 * N:M relationships
 */
database.User.belongsToMany(database.Group, {
  through: 'Members',
});

database.Group.belongsToMany(database.User, {
  through: 'Members'
});

database.User.belongsToMany(database.Message, {
  through: 'Archive'
});

database.Message.belongsToMany(database.User, {
  through: 'Archive',
  foreignKey: 'messageId'
});

export default database;
