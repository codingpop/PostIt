import express from 'express';
import PostIt from './../src/PostIt';
import verifyToken from './../middleware/verifyToken';
import verifyMembership from './../middleware/verifyMembership';

const postMessage = express.Router();
const postIt = new PostIt();

/**
 * Posts  a message to a group
 */
postMessage.post(
  '/groups/:groupId/messages',
  verifyToken,
  verifyMembership,
  (request, response) => {
    const { priority, body } = request.body;
    if (!request.body.body) {
      response.status(400).json({
        message: 'Message body is required'
      });
    } else {
      postIt.postMessage(
        request.params.groupId,
        request.user.userId,
        request.user.userName,
        body.trim(),
        priority,
      )
        .then((message) => {
          response.json({
            message: {
              messageId: message.messageId,
              groupId: message.groupId,
              author: message.author,
              body: message.body,
            }
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

export default postMessage;

