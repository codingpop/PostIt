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
  /**
   * Is session active?
   */
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
          response.json({
            message: `${group.name} created`,
            groupId: group.groupId,
            status: 200
          });
        });
      }).catch((error) => {
        if (error.name ===
          'SequelizeUniqueConstraintError') {
          response.status(406).json({
            message: `${error.fields.name} already exists`,
            status: 406
          });
        } else if (error.name ===
          'SequelizeValidationError') {
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

/**
 * Posts messages to groups
 */
groupRoutes.post('/group/:groupId/message',
  (request, response) => {
    if (!request.session.user) {
      response.status(401).json({
        message: message401,
        status: 401
      });
    } else {
      /**
       * User is logged in
       */
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
              request.body.priority || 'normal',
            ).then(() => {
              response.json({
                message: 'Message posted',
                status: 200
              });
            }).catch((error) => {
              if (error.name === 'SequelizeDatabaseError'
              && error.parent.routine === 'enum_in') {
                response.status(406).json({
                  message: 'Invalid priority',
                  status: 406
                });
              }
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

/**
 * Adds users to groups
 */
groupRoutes.post('/group/:groupId/user',
  (request, response) => {
    if (!request.session.user) {
      response.json({
        message: message401,
        status: 401
      });
    } else {
      PostItInstance.findGroup(request.params.groupId)
        .then((feedback) => {
          if (!feedback) {
            response.status(406).json({
              message: 'Group does not exist',
              status: 406
            });
          } else if (
            request.session.user.userId === feedback.userId
          ) {
            PostItInstance.findUser(request.body.email)
              .then((user) => {
                if (!user) {
                  response.status(406).json({
                    message: 'User does not exist',
                    status: 406
                  });
                } else {
                  PostItInstance.addGroupMember(user.userId,
                    request.params.groupId).then(() => {
                      response.json({
                        message: 'User added',
                        status: 200
                      });
                    }).catch((error) => {
                      if (error.name ===
                        'SequelizeUniqueConstraintError') {
                        response.status(406).json({
                          message: 'User is already a member',
                          status: 406
                        });
                      }
                    });
                }
              });
          } else {
            response.status(401).json({
              message: 'You do not own this group',
              status: 401
            });
          }
        }).catch((error) => {
          if (error.name === 'SequelizeDatabaseError'
            && error.parent.routine === 'string_to_uuid'
          ) {
            response.status(406).json({
              message: 'Invalid group ID',
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

/**
 * Gets all messages in a group
 */
groupRoutes.get('/group/:groupId/messages',
  (request, response) => {
    if (!request.session.user) {
      response.status(401).json({
        message: message401,
        status: 401
      });
    } else {
      PostItInstance.checkMembership(
        request.session.user.userId,
        request.params.groupId
      ).then((group) => {
        if (group) {
          PostItInstance.getMessages(
            request.params.groupId
          ).then((messages) => {
            response.json(messages);
          });
        } else {
          response.status(406).json({
            message: 'Group does not exist',
            status: 406
          });
        }
      }).catch((error) => {
        if (error.name === 'SequelizeDatabaseError'
          && error.parent.routine === 'string_to_uuid') {
          response.status(406).json({
            message: 'Invalid group ID',
            status: 406
          });
        }
      });
    }
  });

export default groupRoutes;
