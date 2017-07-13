import express from 'express';
import PostIt from './../src/postit';

const groupRoutes = express.Router();
const PostItInstance = new PostIt();

const message401 = 'You are not logged in';

/**
 * Creates a new group
 * Rejects request if the user is unauthorized
 * Refuses to create group if group name is empty
 */
groupRoutes.post('/group', (request, response) => {
  // Is session active?
  if (!request.session.user) {
    response.status(401).json({
      message: message401,
      status: 401
    });
  } else {
    PostItInstance.creatGroup(request.body.name,
      request.session.user.userId)
      .then((group) => {
        PostItInstance.addGroupMember(
          request.session.user.userId,
          group.groupId
        ).then(() => {
          response.status(200).json({
            message: `${group.name} created`,
            groupId: group.groupId,
            status: 200
          });
        });
      }).catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          response.status(406).json({
            message: `${error.fields.name} already exists`,
            status: 406
          });
        } else if (error.name === 'SequelizeValidationError') {
          response.status(406).json({
            message: 'Please enter a valid group name',
            status: 406
          });
        } else {
          response.status(500).json({
            message: 'Oops! Something broke',
            status: 500
          });
        }
      });
  }
});

// Posts a message to a group
groupRoutes.post('/group/:groupId/message', (request, response) => {
  if (!request.session.user) {
    response.status(401).json({
      message: message401,
      status: 401
    });
  } else {
    // User is logged in
    PostItInstance.findGroup(request.params.groupId)
      .then((group) => {
        if (
          request.session.user.userId
          === group.userId
        ) {
          PostItInstance.postMessage(
            request.params.groupId,
            request.session.user.userId,
            request.body.message,
            request.body.priority
          ).then(() => {
            response.status(200).json({
              message: 'Message posted',
              status: 200
            });
          });
        } else {
          response.json.status(401)({
            message: 'You do not own this group',
            status: 401
          });
        }
      }).catch(() => {
        response.status(404).json({
          message: 'Group does not exist',
          status: 404
        });
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
    response.status(401).json({
      message: message401,
      status: 401
    });
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
