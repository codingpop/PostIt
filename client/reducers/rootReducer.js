import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import user from './userReducer';
import groups from './groupsReducer';
import messages from './messageReducer';
import members from './membersReducer';

const appReducer = combineReducers({
  user,
  groups,
  messages,
  members,
  router
});

const rootReducer = (state, action) => {
  if (action.type === 'SIGN_OUT_SUCCESS') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
