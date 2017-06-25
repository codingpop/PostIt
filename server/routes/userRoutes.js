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
      .then((feedback) => {
        response.json(feedback);
      }).catch((error) => {
        response.json(error.errors[0].message);
      });
  });
});

userRoutes.post('/user/signin', (request, response) => {
  const [
    email,
    password
  ] = Object.keys(request.body).map(key =>
    request.body[key]);

  PostItInstance.logUserIn(email, password)
    .then((feedback) => {
      bcrypt.compare(password, feedback.password)
        .then((matched) => {
          if (matched) {
            response.json(`Welcome ${feedback.firstName}`);
          } else {
            response.json('You entered a wrong password');
          }
        });
    }).catch(() => {
      response.json('You have not registered');
    });
});

export default userRoutes;
