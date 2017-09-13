export default (connection, Sequelize) => {
  const GroupMember = connection.define('groupMember', {
    membershipId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    // References userId in the User model
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    // References groupId in the Group Model
    groupId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    admin: {
      type: Sequelize.ENUM,
      values: ['yes', 'no'],
      validate: {
        notEmpty: {
          msg: 'Please provide a description'
        }
      }
    }
  });
  return GroupMember;
};
