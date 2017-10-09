import express from 'express';
import PostIt from './../src/PostIt';
import verifyToken from './../middleware/verifyToken';
import verifyMembership from './../middleware/verifyMembership';

const getMembers = express.Router();
const postIt = new PostIt();

/**
 * Gets all the members in a group
 */
getMembers.get(
  '/groups/:groupId/users',
  verifyToken,
  verifyMembership,
  (request, response) => {
    postIt.findGroup(request.params.groupId)
      .then((groupData) => {
        groupData.getUsers()
          .then((users) => {
            const refinedUsers = users.map(user => (
              {
                userId: user.userId,
                userName: user.userName,
                phone: user.phone,
              }
            ));
            response.json({
              users: refinedUsers,
            });
          });
      })
      .catch(() => {
        response.status(500).json({
          message: 'Oops! Something broke'
        });
      });
  }
);

export default getMembers;
