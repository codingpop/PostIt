import express from 'express';
import PostIt from './../src/PostIt';
import verifyToken from './verifyToken';
import verifyGroup from './verifyGroup';

const groups = express.Router();
const PostItInstance = new PostIt();

/**
 * Creates a new group
 * Rejects request if the user is unauthenticated
 * Refuses to create group if group name is empty
 */
groups.post('/groups', verifyToken, (request, response) => {
  const { name, description } = request.body;

  if (!name || !description) {
    response.status(400).json({
      message: 'Both name and description are required'
    });
  } else {
    PostItInstance.createGroup(
      name.trim(),
      description.trim()
    )
      .then((group) => {
        group.addUser(request.user.userId).then(() => {
          response.status(201).json({
            group
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
            message: 'Oops! Something broke',
          });
        }
      });
  }
});

/**
 * Posts messages to groups
 */
groups.post('/groups/:groupId/messages', verifyToken, verifyGroup, (request, response) => {
  if (!request.body.body) {
    response.status(400).json({
      message: 'Message body is required'
    });
  } else {
    PostItInstance.postMessage(request.params.groupId,
      request.user.userId, request.body.body, request.body.priority)
      .then((message) => {
        response.json({
          message
        });
      });
  }
});

/**
 * Adds users to groups
 */
groups.post('/groups/:groupId/users',
  verifyToken, verifyGroup, (request, response) => {
    if (!request.body.users) {
      response.status(400).json({
        message: 'Usernames or emails are required'
      });
    } else {
      PostItInstance.findUsers(JSON.parse(request.body.users))
        .then((users) => {
          if (!users.length) {
            response.status(404).json({
              message: "Users don't exist"
            });
          } else {
            PostItInstance.findGroup(request.params.groupId)
              .then((groupData) => {
                groupData.addUsers(users)
                  .then((newMembers) => {
                    if (!newMembers.length) {
                      response.json({
                        message: 'Users are already members'
                      });
                    } else {
                      const newMembersCount = newMembers[0].length;
                      response.json({
                        message: `${newMembersCount} ${newMembersCount > 1 ?
                          'members' : 'member'} added`,
                        newMembers
                      });
                    }
                  });
              });
          }
        });
    }
  });


/**
 * Gets all the members in a group
 */
groups.get('/groups/:groupId/users', verifyToken, verifyGroup,
  (request, response) => {
    PostItInstance.findGroup(request.params.groupId)
      .then((groupData) => {
        groupData.getUsers().then((users) => {
          const refinedUsers = users.map(user => (
            {
              userId: user.userId,
              userName: user.userName,
              phone: user.phone
            }
          ));
          response.json({
            users: refinedUsers
          });
        });
      });
  });

/**
 * Gets all the groups to which a user belongs
 */
groups.get('/groups', verifyToken, (request, response) => {
  PostItInstance.findUser(request.user.userId)
    .then((userData) => {
      const { limit, offset } = request.query;
      const order = [['createdAt', 'DESC']];
      userData.countGroups().then((totalGroups) => {
        userData.getGroups({ limit, offset, order }).then((userGroups) => {
          const refinedGroups = userGroups.map(group => (
            {
              groupId: group.groupId,
              name: group.name,
              description: group.description
            }
          ));
          response.json({
            totalGroups,
            groups: refinedGroups
          });
        });
      });
    }).catch(() => {
      response.status(500).json({
        message: 'Oops! Something broke'
      });
    });
});

/**
 * Gets all messages in a group
 */
groups.get('/groups/:groupId/messages', verifyToken, verifyGroup,
  (request, response) => {
    PostItInstance.getMessages(
      request.params.groupId
    ).then((messages) => {
      const refinedMessages = messages.map(message => (
        {
          messageId: message.messageId,
          groupId: message.groupId,
          author: message.author,
          body: message.body
        }
      ));
      response.json({
        messages: refinedMessages
      });
    });
  });

export default groups;
