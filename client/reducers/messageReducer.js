import { Messages } from './../types';

const initialState = [];

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case Messages.GET_MESSAGES_SUCCESS:
      return action.messages.map(message => (
        {
          ...state,
          groupId: message.groupId,
          messageId: message.messageId,
          author: message.author,
          body: message.body
        }
      ));
    case Messages.POST_MESSAGE_SUCCESS:
      return [action.message, ...state];
    default:
      return state;
  }
};

export default messageReducer;
