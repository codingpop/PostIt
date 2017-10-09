import express from 'express';
import PostIt from './../src/PostIt';
import verifyToken from './../middleware/verifyToken';
import verifyMembership from './../middleware/verifyMembership';

const addUsers = express.Router();
const postIt = new PostIt();

/**
 * Adds users to a group
 */
addUsers.post(
  '/groups/:groupId/users',
  verifyToken,
  verifyMembership,
  (request, response) => {
    if (!request.body.users) {
      response.status(400).json({
        message: 'Usernames or emails are required',
      });
    } else {
      postIt.findUsers(JSON.parse(request.body.users))
        .then((users) => {
          if (!users.length) {
            response.status(404).json({
              message: "Users don't exist",
            });
          } else {
            postIt.findGroup(request.params.groupId)
              .then((groupData) => {
                groupData.addUsers(users)
                  .then((newMembers) => {
                    if (!newMembers.length) {
                      response.status(406).json({
                        message: 'User(s) are already added',
                      });
                    } else {
                      const newMembersCount = newMembers[0].length;
                      response.json({
                        message: `${newMembersCount} ${newMembersCount > 1 ?
                          'members' : 'member'} added`,
                        newMembers,
                      });
                    }
                  });
              });
          }
        })
        .catch(() => {
          response.status(500).json({
            message: 'Oops! Something broke',
          });
        });
    }
  }
);

export default addUsers;
