import { connection, UserModel, GroupModel } from './models';

/**
 * The User class
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
    this.UserModel = UserModel;
    this.GroupModel = GroupModel;
  }

  /**
   * Registers new user's info to database
   * @param {string} firstName - User's first name
   * @param {string} lastName - User's last name
   * @param {string} email - User's email
   * @param {string} phone - User's phone
   * @param {string} password - User's password
   * @returns {Promise} - returns a Bluebird JS Promise
   */
  registerUser(firstName, lastName, email, phone, password) {
    return connection.sync().then(() =>
      this.UserModel.create({
        firstName,
        lastName,
        email,
        phone,
        password
      })
    );
  }
}

export default PostIt;
