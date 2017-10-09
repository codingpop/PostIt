import { Messages } from './../types';

const initialState = {
  messages: []
};

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
    default:
      return state;
  }
};

export default messageReducer;
