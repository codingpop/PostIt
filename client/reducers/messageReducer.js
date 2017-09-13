import { POST_MESSAGE } from './../types/POST_MESSAGE';

const initialState = {
  messageId: '',
  message: '',
  priority: ''
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_MESSAGE:
      return { ...state, message: action.payload.message };
    default:
      return state;
  }
};

export default messageReducer;
