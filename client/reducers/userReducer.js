import { Authenticate } from './../types';

const initialState = {
  isAuthenticated: false,
  user: {},
  groups: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Authenticate.SIGN_IN_SUCCESS:
      return { ...state, isAuthenticated: !!Object.keys(action.user).length, user: action.user };
    default:
      return state;
  }
};

export default userReducer;
