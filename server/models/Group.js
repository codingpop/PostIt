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
      validate: {
        notEmpty: {
          msg: 'Group name cannot be empty'
        },
      }
    },
    description: {
      type: Sequelize.TEXT,
      validate: {
        notEmpty: {
          msg: 'Please provide a description for your group'
        }
      }
    }
  });
  return Group;
};
