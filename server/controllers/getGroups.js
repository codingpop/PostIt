import express from 'express';
import PostIt from './../src/PostIt';
import verifyToken from './../middleware/verifyToken';

const getGroups = express.Router();
const postIt = new PostIt();

/**
 * Gets all the groups to which a user belongs
 */
getGroups.get('/groups', verifyToken, (request, response) => {
  postIt.findUser(request.user.userId)
    .then((userData) => {
      const limit = !request.query.limit ? 9 : request.query.limit;
      const offset = !request.query.offset ? 0 : request.query.offset;

      userData.countGroups()
        .then((totalGroups) => {
          userData.getGroups({ limit, offset, order: [['createdAt', 'DESC']] })
            .then((userGroups) => {
              const refinedGroups = userGroups.map(group => (
                {
                  groupId: group.groupId,
                  name: group.name,
                  description: group.description,
                }
              ));
              response.json({
                totalGroups,
                groups: refinedGroups,
              });
            });
        });
    }).catch(() => {
      response.status(500).json({
        message: 'Oops! Something broke',
      });
    });
});

export default getGroups;
