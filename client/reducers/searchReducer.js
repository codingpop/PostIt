import { Groups } from './../types';

const initialState = [];

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case Groups.SEARCH_USERS_SUCCESS:
      // return action.users.map(user => (
      //   {
      //     ...state,
      //     userName: user.userName,
      //   }
      // ));

      return action.search;
    default:
      return state;
  }
};

export default searchReducer;
