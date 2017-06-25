import express from 'express';
import PostIt from './../src/postit';

const groupRoutes = express.Router();
const PostItInstance = new PostIt();

const message401 = 'You are not logged in';

// Creates a new group
groupRoutes.post('/group', (request, response) => {
  if (!request.session.user) {
    response.status(401).json({
      messgage: message401,
      status: 401
    });
  } else {
    PostItInstance.creatGroup(request.body.name,
      request.session.user.userId)
      .then((feedback) => {
        response.json(feedback);
      }).catch((error) => {
        response.json(error);
      });
  }
});

// Posts a message to a group
groupRoutes.post('/group/:groupId/message', (request, response) => {
  if (!request.session.user) {
    response.json('No access');
  } else {
    // User is logged in
    PostItInstance.findGroup(request.params.groupId)
      .then((feedback) => {
        if (
          request.session.user.userId
          === feedback.userId
        ) {
          PostItInstance.postMessage(
            request.params.groupId,
            request.session.user.userId,
            request.body.message,
            request.body.priority
          ).then((message) => {
            response.json(message);
          });
        } else {
          response.json('You do not own this group');
        }
      }).catch(() => {
        response.json('Group does not exist');
      });
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
