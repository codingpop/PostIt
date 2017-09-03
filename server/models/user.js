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
          msg: 'First name must contain latin characters only'
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      validate: {
        isAlpha: {
          msg: 'Last name must contain latin characters only'
        }
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    phone: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isMobilePhone: {
          args: 'en-NG',
          msg: 'Invalid phone number'
        }
      }
    },
    password: {
      type: Sequelize.STRING,
    },
  });
  return User;
};
