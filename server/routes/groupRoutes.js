import express from 'express';
import PostIt from './../src/postit';

const groupRoutes = express.Router();
const PostItInstance = new PostIt();

groupRoutes.post('/group', (request, response) => {
  if (!request.session.user) {
    response.status(401).json({
      messgage: 'You are not logged in',
      status: '401'
    });
  } else {
    const [
      name,
      visibility
    ] = Object.keys(request.body).map(key => request.body[key]);

    PostItInstance.creatGroup(
      name,
      visibility,
      request.session.id
    ).then((feedback) => {
      response.json(feedback);
    }).catch((error) => {
      response.json(error);
    });
  }
});

groupRoutes.post('/group/:id/user', (request, response) => {
  if (!request.session.user) {
    response.json('You got no access!');
  } else {
    response.json('Welcome!');
  }
});

groupRoutes.post('/group/:id/message', (request, response) => {
  if (!request.session.user) {
    response.json('No access');
  } else {
    response.json('Welcome');
  }
});

groupRoutes.get('/group/:id/messages', (request, response) => {
  if (!request.session.user) {
    response.json('Please go away');
  } else {
    response.json('You are welcome');
  }
});

export default groupRoutes;
