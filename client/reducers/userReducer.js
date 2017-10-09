import { Authenticate } from './../types';
import initialState from './initialState';

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Authenticate.SIGN_IN_SUCCESS:
    case Authenticate.SET_USER_SUCCESS:
      return { ...state,
        isAuthenticated: !!Object.keys(action.user).length,
        user: action.user,
        token: action.token
      };
    case Authenticate.SIGN_IN_FAILURE:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default userReducer;
