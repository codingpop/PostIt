import express from 'express';
import bcrypt from 'bcryptjs';
import PostIt from './../src/postit';

const userRoutes = express.Router();

const PostItInstance = new PostIt();

userRoutes.post('/user/signup', (request, response) => {
  const [
    firstName,
    lastName,
    email,
    phone,
    password
  ] = Object.keys(request.body).map(key =>
    request.body[key]);

  bcrypt.hash(password, 10).then((hash) => {
    PostItInstance.registerUser(
      firstName,
      lastName,
      email,
      phone,
      hash)
      .then(() => {
        response.status(200).json({
          message: 'success',
          status: 200
        });
      }).catch((error) => {
        response.json({
          message: error,
          status: 200
        });
      });
  });
});

userRoutes.post('/user/signin', (request, response) => {
  const [
    email,
    password
  ] = Object.keys(request.body).map(key =>
    request.body[key]);

  PostItInstance.findUser(email, password)
    .then((feedback) => {
      bcrypt.compare(password, feedback.password)
        .then((matched) => {
          if (matched) {
            request.session.user = feedback;

            response.status(200).json({
              message: `Welcome ${request.session.user.firstName}`,
              status: 200
            });
          } else {
            response.status(401).json({
              message: 'You entered a wrong password',
              status: 401
            });
          }
        });
    }).catch(() => {
      response.status(401).json({
        message: 'You have not registered',
        status: 401
      });
    });
});

export default userRoutes;
