export default (connection, Sequelize) => {
  const Group = connection.define('group', {
    groupId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
    }
  }, {
    paranoid: true
  });
  return Group;
};
