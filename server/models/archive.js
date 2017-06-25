export default (connection, Sequelize) => {
  const Archive = connection.define('archive', {
    archiveId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
  }, {
    paranoid: true
  });
  return Archive;
};
