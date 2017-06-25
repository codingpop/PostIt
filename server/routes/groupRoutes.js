import express from 'express';
import PostIt from './../src/postit';

const groupRoutes = express.Router();

groupRoutes.post('/group', (request, response) => {
  const PostItInstance = new PostIt();

  const [
    name,
    visibility
  ] = Object.keys(request.body).map(key => request.body[key]);

  PostItInstance.creatGroup(
    name,
    visibility
  ).then((feedback) => {
    response.json(feedback);
  }).catch((error) => {
    response.json(error);
  });
});

groupRoutes.post('/group/:id/user', (request, response) => {
  response.json('Group id endpoint is working');
});

groupRoutes.post('/group/:id/message', (request, response) => {
  response.json('Group post message endpoint is working');
});

groupRoutes.get('/group/:id/messages', (request, response) => {
  response.json('Group read messages endpoint is working');
});

export default groupRoutes;
