import express from 'express';
import PostIt from './../src/PostIt';
import verifyToken from './../middleware/verifyToken';

const createGroup = express.Router();
const postIt = new PostIt();

/**
 * Creates a new group
 * Rejects request if the user is unauthenticated
 * Refuses to create group if group name is empty
 */
createGroup.post('/groups', verifyToken, (request, response) => {
  const { name, description } = request.body;

  if (!name || !description) {
    response.status(400).json({
      message: 'Both name and description are required',
    });
  } else {
    postIt.createGroup(name.trim(), description.trim())
      .then((group) => {
        group.addUser(request.user.userId)
          .then(() => {
            response.status(201).json({
              group,
            });
          });
      })
      .catch((error) => {
        if (error.name === 'SequelizeUniqueConstraintError') {
          response.status(406).json({
            message: 'Group already exists',
          });
        } else {
          response.status(500).json({
            message: 'Oops! Something broke',
          });
        }
      });
  }
});

export default createGroup;
