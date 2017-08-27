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
  const firstName = request.body.firstName;
  const lastName = request.body.lastName;
  const email = request.body.email;
  const phone = request.body.phone;
  const password = request.body.password.trim();

  if (password.length < 8) {
    PostIt.responder(
      response,
      'Please enter a password of 8 characters or more',
      406,
      null
    );
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      PostItInstance.registerUser(
        firstName,
        lastName,
        email,
        phone,
        hash)
        .then(() => {
          PostIt.responder(
            response,
            'Registration successful',
            200,
            null
          );
        }).catch((error) => {
          if (error.name === 'SequelizeUniqueConstraintError') {
            PostIt.responder(
              response,
              `${error.errors[0].value} is already registered`,
              406,
              null
            );
          } else if (error.name === 'SequelizeValidationError') {
            const errMessage = {};

            error.errors.forEach((err) => {
              errMessage[err.path] = 'Invalid input';
            });

            PostIt.responder(
              response,
              'Please check your submission',
              406,
              errMessage
            );
          } else {
            PostIt.responder(response, 'Oops! Something broke', 500);
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
  const email = request.body.email;
  const password = request.body.password;

  PostItInstance.findUser(email)
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((passwordMatched) => {
          if (passwordMatched) {
            request.session.user = user;

            PostIt.responder(
            response,
            'Login successful',
            200,
            { firstName: request.session.user.firtName }
            );
          } else {
            PostIt.responder(
              response,
              'Wrong password',
              401,
              null
            );
          }
        });
    }).catch((error) => {
      if (!Object.keys(error).length) {
        PostIt.responder(
          response,
          'Email is not registered',
          401,
          null
        );
      } else {
        PostIt.responder(
          response,
          'Oops! Something broke',
          500,
          null
        );
      }
    });
});

export default userRoutes;
