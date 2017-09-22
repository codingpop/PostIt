export default (connection, Sequelize) => {
  const GroupMember = connection.define('groupMember', {
    userId: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true
    },
    // References groupId in the Group Model
    groupId: {
      type: Sequelize.UUID,
      allowNull: false
    },
  });
  return GroupMember;
};
