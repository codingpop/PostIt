export default (connection, Sequelize) => {
  const Group = connection.define('group', {
    groupId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    description: {
      type: Sequelize.TEXT,
    }
  });

  return Group;
};
