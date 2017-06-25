export default (connection, Sequelize) => {
  const GroupMember = connection.define('groupMember', {
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
    },
    // References userId in User Model
    groupId: {
      type: Sequelize.UUID,
      allowNull: false
    }
  }, {
    paranoid: true
  });
  return GroupMember;
};
