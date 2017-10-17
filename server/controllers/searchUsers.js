import express from 'express';
import PostIt from './../src/PostIt';
import verifyToken from './../middleware/verifyToken';

const searchUsers = express.Router();
const postIt = new PostIt();

searchUsers.get(
  '/users/search',
  verifyToken,
  (request, response) => {
    if (!request.query.query) {
      response.status(400).json({
        message: 'Search query is required'
      });
    } else {
      postIt.searchUsers(request.query.query)
      .then((users) => {
        response.status(200).json({
          users
        });
      })
      .catch(() => {
        response.status(500).json({
          message: 'Oops! Something broke'
        });
      });
    }
  }
);

export default searchUsers;
