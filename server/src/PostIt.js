import validate from 'uuid-validate';
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
    return this.database.connection.sync().then(() =>
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
    if (validate(credential)) { // If credential is UUID
      return this.database.User.findOne({
        where: {
          userId: credential
        }
      });
    }
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
   * Finds all users with the supplied parameter
   *
   * @param {Array} users - array containing usernames or emails
   * @memberof PostIt
   *
   * @returns {Promise} - a promise
   */
  findUsers(users) {
    return this.database.User.findAll({
      where: {
        $or: [{
          email: users
        }, {
          userName: users
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
   * Creates a new group for a user
   * @param {string} name - Name of the group
   * @param {string} description - Description of group
   *
   * @returns {Promise} - returns a Promise
   */
  createGroup(name, description) {
    return this.database.Group.create({
      name,
      description
    });
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
  postMessage(groupId, author, body, priority = 'normal') {
    return this.database.Message.create({
      groupId,
      author,
      body,
      priority
    });
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
}

export default PostIt;
