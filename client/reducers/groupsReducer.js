import { Groups } from './../types';

const initialState = {
  groups: []
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case Groups.GET_GROUPS:
      return { ...state, groups: action.groups };
    default:
      return state;
  }
};

export default userReducer;
