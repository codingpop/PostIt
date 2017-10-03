import { Groups } from './../types';

const initialState = {
  userGroups: [],
  totalGroups: 0
};

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Groups.GET_GROUPS_SUCCESS:

      return {
        ...state,
        userGroups: action.userGroups.groups,
        totalGroups: action.userGroups.totalGroups
      };
    default:
      return state;
  }
};

export default groupsReducer;
