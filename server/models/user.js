export default (connection, Sequelize) => {
  const User = connection.define('user', {
    userId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: Sequelize.STRING,
      validate: {
        isAlpha: true
      },
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      }
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isDecimal: true,
        len: [10, 11]
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
  }, {
    paranoid: true
  });
  return User;
};
