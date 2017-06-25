export default (connection, Sequelizes) => {
  const User = connection.define('user', {
    userId: {
      type: Sequelizes.UUID,
      defaultValue: Sequelizes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: Sequelizes.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelizes.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelizes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: Sequelizes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelizes.STRING,
      allowNull: false
    },
  }, {
    paranoid: true
  });
  return User;
};
