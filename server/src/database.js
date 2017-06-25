import dotenv from 'dotenv';
import Sequelize from 'sequelize';
import User from './../models/user';
import Group from './../models/group';


dotenv.config();

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS, {
    dialect: 'postgres',
    logging: false
  });

const database = {};

// Database models
database.Sequelize = Sequelize;
database.connection = connection;
database.User = User(connection, Sequelize);
database.Group = Group(connection, Sequelize);


// Database 1:M relationships
database.Group.belongsTo(database.User, {
  foreignKey: 'userId'
});
database.User.hasMany(database.Group, {
  foreignKey: 'userId'
});

export default database;
