import express from 'express';
import bcrypt from 'bcryptjs';
import PostIt from './../src/postit';

const userRoutes = express.Router();

const PostItInstance = new PostIt();

/**
 * Registers a new user
 * Rejects users that have already registered
 */
userRoutes.post('/user/signup', (request, response) => {
  const [
    firstName,
    lastName,
    email,
    phone,
    password
  ] = Object.keys(request.body).map(key =>
    request.body[key]);

  if (password.length !== 8) {
    response.status(406).json({
      message: 'Please enter a valid password',
      status: 406
    });
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      PostItInstance.registerUser(
        firstName,
        lastName,
        email,
        phone,
        hash)
        .then(() => {
          response.status(200).json({
            message: 'Registration successful',
            status: 200
          });
        }).catch((error) => {
          if (error.name === 'SequelizeUniqueConstraintError') {
            response.status(406).json({
              message: `${error.errors[0].value} is already registered`,
              status: 406
            });
          } else if (error.name === 'SequelizeValidationError') {
            const errMessage = {};

            error.errors.forEach((err) => {
              errMessage[err.path] = 'Invalid input';
            });

            response.status(406).json({
              message: 'Please check your submission',
              errors: errMessage,
              status: 406
            });
          } else {
            response.status(500).json({
              message: 'Oops! Something broke',
              status: 500
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
userRoutes.post('/user/signin', (request, response) => {
  const [
    email,
    password
  ] = Object.keys(request.body).map(key =>
    request.body[key]);

  PostItInstance.findUser(email, password)
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (matched) {
            request.session.user = user;

            response.status(200).json({
              message: `Welcome ${request.session.user.firstName}`,
              status: 200
            });
          } else {
            response.status(401).json({
              message: 'You have entered a wrong password',
              status: 401
            });
          }
        });
    }).catch((error) => {
      if (!Object.keys(error).length) {
        response.status(401).json({
          message: 'Email is not registered',
          status: 401
        });
      } else {
        response.status(500).json({
          message: 'Oops! Something broke',
          status: 500
        });
      }
    });
});

export default userRoutes;
