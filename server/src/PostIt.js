import database from './database';

/**
 * The PostIt class
 * @author Babatunde Adeyemi <tundewrites@gmail.com>
 * @class
 */
class PostIt {

  /**
   * Initializes the database connection
   * Initializes the database models
   * @constructor
   */
  constructor() {
    this.database = database;
  }

  /**
   * Registers new user's info to database
   * @param {string} userName - User's name
   * @param {string} email - User's email
   * @param {string} phone - User's phone
   * @param {string} password - User's password
   *
   * @returns {Promise} - returns a Promise
   */
  register(userName, email, phone, password) {
    return this.database.connection.sync({ force: true }).then(() =>
      this.database.User.create({
        userName,
        email,
        phone,
        password
      })
    );
  }

  /**
   * Fetches a user's details
   * @param {string} credential - can be username, email or phone number
   *
   * @returns {Promise} - returns a Promise
   */
  findUser(credential) {
    return this.database.User.findOne({
      where: {
        $or: [{
          email: {
            $iLike: credential
          }
        }, {
          userName: {
            $iLike: credential
          }
        }, {
          phone: {
            $iLike: credential
          }
        }]
      }
    });
  }

  /**
   * Fetches a group's details
   * @param {string} groupId - groupId of a particular group
   *
   * @returns {Promise} - returns a Promise
   */
  findGroup(groupId) {
    return this.database.Group.findOne({
      where: {
        groupId
      }
    });
  }

  /**
   * Fetches all the groups to which a user belongs
   * @param {string} userId - database id of the user
   *
   * @returns {Promise} - returns a Promise
   */
  findGroups(userId) {
    return this.database.User.findOne({
      where: {
        userId
      }
    });
  }

  /**
   * Creates a new group for a user
   * @param {string} name - Name of the group
   * @param {string} description - Description of group
   *
   * @returns {Promise} - returns a Promise
   */
  createGroup(name, description) {
    return this.database.connection.sync().then(() =>
      this.database.Group.create({
        name,
        description
      })
    );
  }

  /**
   * Posts a message to a group
   * @param {string} groupId - groupId of target group
   * @param {string} author - userId of the User
   * @param {string} body - Message content
   * @param {string} priority - Type of message
   *
   * @return {Promise} - returns a Promise
   */
  postMessage(groupId, author, body, priority) {
    return this.database.connection.sync().then(() =>
      this.database.Message.create({
        groupId,
        author,
        body,
        priority
      })
    );
  }

  /**
   * Adds a member to a group
   * @param {string} userId - userId of the user
   * @param {string} groupId - groupId of the group
   * @param {boolean} isAdmin - role of the group member
   *
   * @returns {Promise} - returns a Promise
   */
  addGroupMember(userId, groupId, isAdmin) {
    return this.database.connection.sync().then(() =>
      this.database.GroupMember.create({
        userId,
        groupId,
        isAdmin
      })
    );
  }

  /**
   * Fetches all messages in a particular group
   * @param {string} groupId - target group
   *
   * @returns {Promise} - returns a Promise
   */
  getMessages(groupId) {
    return this.database.Message.findAll({
      where: {
        groupId
      }
    });
  }

  /**
   * Checks if a user is a member of a particular group
   * @param {String} userId - UUID of the user
   * @param {String} groupId - UUID of the group
   *
   * @returns {Promise} - returns a Promise
   */
  checkMembership(userId, groupId) {
    return this.database.GroupMember.findOne({
      where: {
        userId,
        groupId
      }
    });
  }
}

export default PostIt;
