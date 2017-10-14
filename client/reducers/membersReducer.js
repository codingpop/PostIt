import { Groups } from './../types';

const initialState = [];

const membersReducer = (state = initialState, action) => {
  switch (action.type) {
    case Groups.GET_MEMBERS_SUCCESS:
      return action.members.map(member => (
        {
          ...state,
          userId: member.userId,
          userName: member.userName,
          phone: member.phone
        }
      ));
    default:
      return state;
  }
};

export default membersReducer;
