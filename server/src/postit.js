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
   * @param {string} firstName - User's first name
   * @param {string} lastName - User's last name
   * @param {string} email - User's email
   * @param {string} phone - User's phone
   * @param {string} password - User's password
   * @returns {Promise} - returns a Promise
   */
  registerUser(firstName, lastName, email, phone, password) {
    return this.database.connection.sync().then(() =>
      this.database.User.create({
        firstName,
        lastName,
        email,
        phone,
        password
      })
    );
  }

  /**
   * Fetches a user's details
   * @param {string} email - Signin email address
   * @returns {Promise} - returns a Promise
   */
  findUser(email) {
    return this.database.User.findOne({
      where: {
        email
      }
    });
  }

  /**
   * Fetches a group's details
   * @param {string} groupId - groupId of a particular group
   * @returns {Promise}- returns a Promise
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
   * @param {string} userId - userId of the creator
   * @returns {Promise} - returns a Promise
   */
  creatGroup(name, userId) {
    return this.database.connection.sync().then(() =>
      this.database.Group.create({
        name,
        userId
      })
    );
  }

  /**
   * Posts a message to a group
   * @param {string} inGroup - groupId of target group
   * @param {string} author - userId of the User
   * @param {string} body - Message content
   * @param {string} priority - Type of message
   * @return {Promise} - returns a Promise
   */
  postMessage(inGroup, author, body, priority) {
    return this.database.connection.sync().then(() =>
      this.database.Message.create({
        inGroup,
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
   * @returns {Promise} - returns a Promise
   */
  addGroupMember(userId, groupId) {
    return this.database.connection.sync().then(() =>
      this.database.GroupMember.create({
        userId,
        groupId
      })
    );
  }

  /**
   * Fetches all messages in a particular group
   * @param {string} groupId - target group
   * @returns {Promise} - returns a Promise
   */
  getMessages(groupId) {
    return this.database.Message.findAll({
      where: {
        inGroup: groupId
      }
    });
  }

  /**
   * Checks if an input is a string
   * @param {String} input - value to checked
   * @returns {Boolean} - returns either true or false
   */
  static isString(input) {
    if (typeof input !== 'string' && input.length < 3) {
      return false;
    }
    return true;
  }

  /**
   * Checks if an input is a number
   * @param {Nmber} number - value to be checked
   * @returns {Boolean} - returns either true or false
   */
  static isPhone(number) {
    if (number.length < 11) {
      return false;
    }
    if (isNaN(Number(number))) {
      return false;
    }
    return true;
  }
}

export default PostIt;
