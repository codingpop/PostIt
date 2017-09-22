import { Authenticate } from './../types';
import initialState from './initialState';

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Authenticate.SIGN_IN_SUCCESS:
      return { ...state, isAuthenticated: !!Object.keys(action.user).length, user: action.user };
    case Authenticate.SIGN_IN_FAILURE:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default userReducer;
