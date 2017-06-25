export default (connection, Sequelize) => {
  const Archive = connection.define('archive', {
    archiveId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    // References messageId in the message model
    messageId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    // References userId in the user model
    userId: {
      type: Sequelize.UUID,
      allowNull: false
    }
  }, {
    paranoid: true
  });
  return Archive;
};
