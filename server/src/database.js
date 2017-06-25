import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import User from './../models/user';
import Group from './../models/group';
import Message from './../models/message';
import GroupMember from './../models/groupMember';
import Archive from './../models/archive';

dotenv.config();

const production = {
  ssl: true,
  native: true,
};

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: process.env.NODE_ENV ? {} : production,
    logging: false
  });

const database = {};

// Database models
database.Sequelize = Sequelize;
database.connection = connection;
database.User = User(connection, Sequelize);
database.Group = Group(connection, Sequelize);
database.Message = Message(connection, Sequelize);
database.GroupMember = GroupMember(connection, Sequelize);
database.Archive = Archive(connection, Sequelize);

// Database 1:M relationships
database.Group.belongsTo(database.User, {
  foreignKey: 'userId'
});
database.User.hasMany(database.Group, {
  foreignKey: 'userId'
});

database.Message.belongsTo(database.Group, {
  foreignKey: 'inGroup'
});
database.Group.hasMany(database.Message, {
  foreignKey: 'inGroup'
});

database.Message.belongsTo(database.User, {
  foreignKey: 'author'
});
database.User.hasMany(database.Message, {
  foreignKey: 'author'
});

// Database N:M relationships
database.User.belongsToMany(database.Group, {
  through: database.GroupMember,
  foreignKey: 'userId'
});

database.Group.belongsToMany(database.User, {
  through: database.GroupMember,
  foreignKey: 'groupId'
});

database.User.belongsToMany(database.Message, {
  through: database.Archive,
  foreignKey: 'userId'
});

database.Message.belongsToMany(database.User, {
  through: database.Archive,
  foreignKey: 'messageId'
});

export default database;
