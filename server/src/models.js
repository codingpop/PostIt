import Sequelize from 'sequelize';

const connection = new Sequelize('postit', 'postgres', 'postgres', {
  dialect: 'postgres',
  logging: false
});

const UserModel = connection.define('user', {
  userId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const GroupModel = connection.define('group', {
  groupId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  visbility: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

GroupModel.hasMany(UserModel);

export { UserModel, GroupModel, connection };
