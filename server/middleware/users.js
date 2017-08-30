import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import PostIt from './../src/PostIt';

dotenv.config();
const users = express.Router();
const PostItInstance = new PostIt();

/**
 * Registers a new user
 * Rejects users that have already registered
 */
users.post('/signup', (request, response) => {
  const { firstName, lastName, email, phone, password } = request.body;

  if (password.trim().length < 8) {
    response.status(400).json({
      message: 'Password must be 8 characters or more'
    });
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      PostItInstance.register(
        firstName,
        lastName,
        email,
        phone,
        hash)
        .then(() => {
          response.status(201).json({
            message: 'Registration successful'
          });
        }).catch((error) => {
          if (error.name === 'SequelizeUniqueConstraintError') {
            response.status(409).json({
              message: `${error.errors[0].value} already exists`
            });
          } else if (error.name === 'SequelizeValidationError') {
            response.status(400).json({
              message: error.errors[0].message
            });
          } else {
            response.status(500).json({
              message: 'Oops! Something broke'
            });
          }
        });
    });
  }
});

/**
 * Logs a new user in
 * Rejects signing in if credentials are wrong
 */
users.post('/signin', (request, response) => {
  const { email, password } = request.body;

  PostItInstance.findUser(email)
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((passwordMatches) => {
          if (passwordMatches) {
            const { userId, firstName, lastName } = user.userId;
            const payload = {
              userId,
              firstName,
              lastName,
              email
            };

            jwt.sign(payload, process.env.SECRET, { expiresIn: 86400 }, (error, token) => {
              response.status(201).json({ token });
            });
          } else {
            response.status(401).json({
              message: 'Wrong password'
            });
          }
        });
    }).catch((error) => {
      if (Object.is(error, {})) {
        response.status(404).json({
          message: 'You are not a member'
        });
      } else {
        response.status(500).json({
          message: 'Oops! Something broke'
        });
      }
    });
});

export default users;
