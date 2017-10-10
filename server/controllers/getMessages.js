import express from 'express';
import PostIt from './../src/PostIt';
import verifyToken from './../middleware/verifyToken';
import verifyMembership from './../middleware/verifyMembership';

const getMessages = express.Router();
const postIt = new PostIt();

/**
 * Gets all messages in a group
 */
getMessages.get(
  '/groups/:groupId/messages',
  verifyToken,
  verifyMembership,
  (request, response) => {
    postIt.getMessages(request.params.groupId)
      .then((messages) => {
        const refinedMessages = messages.map(message => (
          {
            messageId: message.messageId,
            groupId: message.groupId,
            author: message.author,
            userName: message.userName,
            body: message.body,
          }
        ));
        response.status(200).json({
          messages: refinedMessages,
        });
      })
      .catch((error) => {
        response.status(500).json({
          message: 'Oops! Something broke',
          error
        });
      });
  }
);

export default getMessages;
