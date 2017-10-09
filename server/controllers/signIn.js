import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import PostIt from './../src/PostIt';

dotenv.config();
const signIn = express.Router();
const postIt = new PostIt();

/**
 * Logs a new user in
 * Rejects signing in if credentials are wrong
 */
signIn.post('/users/signin', (request, response) => {
  const { credential, password } = request.body;

  if (!credential || !password) {
    response.status(400).json({
      message: 'You userName (or email) and password are required'
    });
  } else {
    postIt.findUser(credential)
      .then((user) => {
        bcrypt.compare(password, user.password)
          .then((passwordMatches) => {
            if (passwordMatches) {
              const payload = {
                userId: user.userId,
                userName: user.userName,
                phone: user.phone,
                email: user.email
              };

              jwt.sign(payload,
                process.env.SECRET,
                { expiresIn: 86400 },
                (error, token) => {
                  response.json({
                    user: payload,
                    token
                  });
                });
            } else {
              response.status(401).json({
                message: 'Wrong password'
              });
            }
          });
      }).catch((error) => {
        if (!Object.keys(error).length) {
          response.status(404).json({
            message: 'You are not registered'
          });
        } else {
          response.status(500).json({
            message: 'Oops! Something broke',
          });
        }
      });
  }
});

export default signIn;
