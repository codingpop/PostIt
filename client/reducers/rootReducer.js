import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import user from './userReducer';
import groups from './groupsReducer';
import messages from './messageReducer';
import members from './membersReducer';

const rootReducer = combineReducers({
  user,
  groups,
  messages,
  members,
  router
});

export default rootReducer;
