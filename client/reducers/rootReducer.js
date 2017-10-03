import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import user from './userReducer';
import groups from './groupsReducer';

const rootReducer = combineReducers({
  user,
  groups,
  router
});

export default rootReducer;
