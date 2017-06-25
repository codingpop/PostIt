const Sequelize = require('sequelize');

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
    this.connection = new Sequelize('postit', 'postgres', 'postgres', {
      dialect: 'postgres',
    });
    this.UserModel = this.connection.define('user', {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          len: [2, 100]
        }
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
  }

  /**
   * Registers new user's info to database
   * @returns {Promise} - returns a promise
   */
  registerUser() {
    return this.connection.sync({
      force: true,
    }).then(() => {
      this.UserModel.create({
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        password: this.password
      });
    });
  }
}

module.exports = User;
