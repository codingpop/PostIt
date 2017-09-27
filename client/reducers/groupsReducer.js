import { Groups } from './../types';

const initialState = [];

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Groups.GET_GROUPS_SUCCESS:
      return [...state, ...action.groups];
    case Groups.CREATE_GROUP_SUCCESS:
      return [action.group, ...state];
    default:
      return state;
  }
};

export default groupsReducer;
