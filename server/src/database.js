import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import User from './../models/User';
import Group from './../models/Group';
import Message from './../models/Message';

dotenv.config();

let connection;

if (process.env.NODE_ENV !== 'production') {
  connection = new Sequelize(
    process.env.DB_TEST_NAME,
    process.env.DB_TEST_USER,
    process.env.DB_TEST_PASS, {
      host: process.env.DB_TEST_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      logging: false
    });
} else {
  connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      dialect: 'postgres',
      dialectOptions: {
        ssl: true,
        native: true,
      },
      logging: false
    });
}


const database = {};

// Database models
database.Sequelize = Sequelize;
database.connection = connection;
database.User = User(connection, Sequelize);
database.Group = Group(connection, Sequelize);
database.Message = Message(connection, Sequelize);

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

// Database N:M relationships
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
