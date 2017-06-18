/**
 * The User class
 * @author Babatunde Adeyemi <tundewrites@gmail.com>
 * @class
 */
class User {

  /**
   * Initializes the user details
   * @constructor
   * @param {string} firstName - user's first name
   * @param {string} lastName - user's last name
   * @param {string} email - user's email address
   * @param {number} phone - user's phone number
   * @param {string} password - user's password
   */
  constructor(firstName, lastName, email, phone, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }

  /**
   * Registers new user's info to database
   */
  register() {

  }

  /**
   * Creates a group
   * @param {string} groupName - name of the group
   */
  createGroup(groupName) {

  }

  /**
   * Adds a user to a particular group
   * @param {number} userId - user's database ID
   * @param {number} groupId - target group's database ID
   */
  addUserToGroup(userId, groupId) {

  }

  /**
   * Posts a message to a group
   * @param {string} message - message to be posted
   * @param {number} groupId - target group's database ID
   */
  postMessage(message, groupId) {

  }
}

export default User;
