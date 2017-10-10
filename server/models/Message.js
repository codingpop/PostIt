export default (connection, Sequelize) => {
  const Message = connection.define('message', {
    messageId: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true
    },
    groupId: {
      type: Sequelize.UUID,
      allowNull: false
    },
    author: {
      type: Sequelize.UUID,
      allowNull: false
    },
    userName: {
      type: Sequelize.TEXT
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Message cannot be empty'
        }
      }
    },
    priority: {
      type: Sequelize.ENUM,
      values: ['normal', 'urgent', 'critical']
    }
  }, {
    paranoid: true
  });

  return Message;
};
