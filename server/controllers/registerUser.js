import express from 'express';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import PostIt from './../src/PostIt';

dotenv.config();
const registerUser = express.Router();
const postIt = new PostIt();

/**
 * Registers a new user
 * Rejects users that have already registered
 */
registerUser.post('/users/signup', (request, response) => {
  const { userName, email, phone, password } = request.body;

  if (!userName) {
    response.status(400).json({
      message: 'Username is required',
    });
  } else if (!email) {
    response.status(400).json({
      message: 'Email is required',
    });
  } else if (!phone) {
    response.status(400).json({
      message: 'Phone is required',
    });
  } else if (!password) {
    response.status(400).json({
      message: 'Password is required',
    });
  } else if (password.trim().length < 8) {
    response.status(400).json({
      message: 'Password must be 8 characters or more',
    });
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      postIt.registerUser(
        userName,
        email,
        phone,
        hash)
        .then(() => {
          response.status(201).json({
            message: 'Registration successful',
          });
        }).catch((error) => {
          if (error.name === 'SequelizeUniqueConstraintError') {
            response.status(409).json({
              message: `${error.errors[0].value} already exists`
            });
          } else if (error.name === 'SequelizeValidationError') {
            response.status(400).json({
              message: error.errors[0].message,
            });
          } else {
            response.status(500).json({
              message: 'Oops! Something broke',
              error
            });
          }
        });
    });
  }
});

export default registerUser;
