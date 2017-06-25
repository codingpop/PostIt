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

// Adds a user to a group
groupRoutes.post('/group/:groupId/user', (request, response) => {
  if (!request.session.user) {
    response.json({
      message: message401,
      status: 401
    });
  } else {
    PostItInstance.findGroup(request.params.groupId)
      .then((feedback) => {
        if (request.session.user.userId === feedback.userId) {
          PostItInstance.findUser(request.body.email)
            .then((message) => {
              PostItInstance.addGroupMember(message.userId, request.params.groupId)
                .then((output) => {
                  response.json(output);
                });
            }).catch(() => {
              response.send('user does not exist');
            });
        } else {
          response.json('You do not own this group');
        }
      }).catch(() => {
        response.json('Group does not exist');
      });
  }
});

// Gets all messages from an accessible group
groupRoutes.get('/group/:groupId/messages', (request, response) => {
  if (!request.session.user) {
    response.json('Please go away');
  } else {
    // Check if user is a member
    PostItInstance.checkMembership(request.session.user.userId, request.params.groupId)
    .then((feedback) => {
      if (feedback) {
        // User is a member
        PostItInstance.getMessages(request.params.groupId)
        .then((messages) => {
          response.json(messages);
        });
      }
    }).catch(() => {
      response.json('Something broke');
    });
  }
});

export default groupRoutes;
