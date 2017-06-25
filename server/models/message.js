export default (connection, Sequelize) => {
  const Message = connection.define('message', {
    messageId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    inGroup: {
      type: Sequelize.UUID,
      allowNull: false
    },
    author: {
      type: Sequelize.UUID,
      allowNull: false
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false,
      unique: true
    },
    priority: {
      type: Sequelize.ENUM,
      values: ['normal', 'urgent', 'critical'],
      allowNull: false
    }
  }, {
    paranoid: true
  });
  return Message;
};
