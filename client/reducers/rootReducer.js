import { combineReducers } from 'redux';

import user from './userReducer';
import groups from './groupsReducer';

const rootReducer = combineReducers({
  user,
  groups
});

export default rootReducer;
