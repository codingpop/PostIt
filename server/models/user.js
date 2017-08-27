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
        isAlpha: {
          args: true,
          msg: 'Input must contain only latin characters'
        }
      },
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          args: true,
          msg: 'Input must contain only latin characters'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: 'Invalid email address'
        }
      }
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isDecimal: {
          args: true,
          msg: 'Invalid phone number'
        },
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
