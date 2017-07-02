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
    }
  }, {
    paranoid: true
  });
  return GroupMember;
};
