import { SET_MESSAGE } from './../types/message';

const initialState = {
  message: ''
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE:
      return { ...state, message: action.payload.message };
    default:
      return state;
  }
};

export default messageReducer;
