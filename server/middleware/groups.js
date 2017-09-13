import express from 'express';
import PostIt from './../src/PostIt';
import verifyToken from './verifyToken';

const groups = express.Router();
const PostItInstance = new PostIt();

/**
 * Creates a new group
 * Rejects request if the user is unauthorized
 * Refuses to create group if group name is empty
 */
groups.post('/groups', verifyToken, (request, response) => {
  const { name, description } = request.body;
  if (!request.user) {
    response.status(401).json({
      message: 'You are not logged in',
    });
  } else if (!name || !description) {
    response.status(400).json({
      message: 'Please check your submission'
    });
  } else {
    PostItInstance.createGroup(
      name.trim(),
      description.trim()
    )
      .then((group) => {
        PostItInstance.addGroupMember(
          request.user.userId,
          group.groupId,
          'yes'
        ).then(() => {
          response.status(201).json({
            groupId: group.groupId
          });
        });
      }).catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          response.status(406).json({
            message: 'Group name already exists'
          });
        } else if (error.name === 'SequelizeValidationError') {
          response.status(406).json({
            message: error.errors[0].message
          });
        } else {
          response.status(500).json({
            message: 'Oops! Something broke'
          });
        }
      });
  }
});

/**
 * Posts messages to groups
 */
groups.post('/groups/:groupId/messages', verifyToken,
  (request, response) => {
    if (!request.user) {
      response.status(401).json({
        message: 'You are not logged in'
      });
    } else if (!request.body.message || !request.body.priority) {
      response.status(400).json({
        message: 'Please check your submission'
      });
    } else {
      PostItInstance.checkMembership(request.user.userId, request.params.groupId)
        .then((member) => {
          if (member.admin === 'yes') {
            PostItInstance.postMessage(
              request.params.groupId,
              request.user.userId,
              request.body.message.trim(),
              request.body.priority.trim() || 'normal'
            ).then(() => {
              response.status(201).json({
                message: 'Message posted'
              });
            }).catch((error) => {
              if (error.name === 'SequelizeDatabaseError'
                && error.parent.routine === 'enum_in') {
                response.status(406).json({
                  message: 'Invalid priority',
                });
              } else {
                response.status(406).json({
                  message: error.errors[0].message
                });
              }
            });
          } else {
            response.status(401).json({
              message: 'You are not a morderator of this group',
              member
            });
          }
        }).catch((error) => {
          if (!Object.keys(error)) {
            response.status(404).json({
              message: 'Group does not exist',
            });
          } else {
            response.status(500).json({
              message: 'Oops! Something broke'
            });
          }
        });
    }
  });

/**
 * Adds users to groups
 */
groups.post('/groups/:groupId/users', verifyToken,
  (request, response) => {
    if (!request.user) {
      response.status(401).json({
        message: 'You are not logged in'
      });
    } else if (!request.body.email) {
      response.status(400).json({
        message: 'Please check your submission'
      });
    } else {
      PostItInstance.checkMembership(
        request.user.userId,
        request.params.groupId)
        .then((group) => {
          if (!group) {
            response.status(404).json({
              message: 'Group doesn\'t exist'
            });
          } else if (group.admin === 'yes') {
            PostItInstance.findUser(request.body.email)
              .then((user) => {
                PostItInstance.addGroupMember(
                  user.userId,
                  request.params.groupId,
                  'no'
                ).then(() => {
                  response.status(200).json({
                    message: 'User added'
                  });
                }).catch((error) => {
                  if (error.name === 'SequelizeUniqueConstraintError') {
                    response.json({
                      message: 'User is already a member'
                    });
                  }
                });
              }).catch((error) => {
                if (!Object.keys(error).length) {
                  response.json({
                    message: 'User is not registered'
                  });
                }
              });
          } else {
            response.json({
              message: 'You are not a morderator of this group'
            });
          }
        }).catch((error) => {
          response.send(error);
        });
    }
  });

/**
 * Gets all messages in a group
 */
groups.get('/groups/:groupId/messages',
  (request, response) => {
    if (!request.user) {
      response.status(401).json({
        message: 'You are not logged in'
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

export default groups;
